# Orbit.py: Defines a Keplerian elliptical orbit
import numpy as np
import foe_constants as fc
import ComputationalMethods as cm
from math import cos, sin, atan2

### Helper Functions
# TODO: best practice for putting this somewhere?
def f_ecc(E_guess, args):
    # Kepler's Equation for Newton's Method
    return E_guess - args[0] * sin(E_guess) - args[1]

def f_prime_ecc(E_guess, args):
    # Kepler's Equation - First Derivative for Newton's Method
    return 1 - args[0] * cos(E_guess)


### Orbit Class
class Orbit():
    """A representation of an orbital trajectory at epoch.

    An Orbit is defined by a 6-variable Keplerian state vector
    with true anomaly defined at epoch. Information such as the
    orbital period, and position at some t after epoch can be
    extracted from an Orbit object. Information can be returned
    in terms of Keplerian orbital elements or a Cartesian state
    vector.

    """
    def __init__(self, ecc, sma, inc, raan, argp, tra, sgp=fc.MU_EARTH, epoch=0):
        """Initializes a new two-body Keplerian orbit.

        Parameters
        ---------
        ecc : float
            Eccentricity (e)
        sma : float
            Semi-major axis (a)
        inc : float
            Inclination (i)
        raan : float 
            Right ascension of the ascending node (Omega)
        argp : float
            Argument of periapsis (omega)
        tra : float
            True Anomaly (theta) at epoch
        sgp : float, optional
            Standard Gravitaional Parameter (mu) (default Earth)
        epoch : float, optional
            The time for which these orbital elements are valid (default 0)
        """
        self.ecc = ecc
        self.sma = sma
        self.inc = inc
        self.raan = raan
        self.argp = argp
        self.tra = tra
        self.sgp = sgp
        self.epoch = epoch

    # Step 1a from conversion docs: calculate mean motion
    def get_mean_motion(self):
        n = np.sqrt(self.sgp/(self.sma**3))
        return n

    # Step 1b from conversion docs: calculate mean anomaly
    def get_mean_anomaly(self, t) -> float:
        """Computes the mean anomaly for time t.

        Parameters
        ---------
        t : float
            The time t since epoch

        Returns
        --------
        The mean anomaly for time t.
        """
        n = self.get_mean_motion()
        M = n*(t - self.epoch)

        return M

    # Step 2: calculate eccentric anomaly using Newton's method
    def get_eccentric_anomaly(self, t):
        """Computes the eccentric anomaly for time t since epoch.
        
        Parameters
        --------
        t : float
            The time t since epoch

        Returns
        --------
        The eccentric anomaly for time t.
        """
        M = self.get_mean_anomaly(t)
        args = [self.ecc, M]
        # Initial guess
        E0 = M - self.ecc
        E, n = cm.newtons_single(f_ecc, f_prime_ecc, E0, args=args)

        return E, n

    # Step 3: calculate true anomaly (closed-form)
    def get_true_anomaly(self, t):
        """Computes the true anomaly for time t since epoch.

        Parameters
        --------
        t : float
            The time t since epoch

        Returns
        --------
        The true anomaly for time t.
        """
        E = self.get_eccentric_anomaly(t)[0]
        print(self.ecc, E)
        nu = 2*atan2(
            np.sqrt(1 - self.ecc**2) * sin(E),
            cos(E - self.ecc)
        )
        return nu

    # Step 4: compute the orbit radius
    def get_radius(self, t):
        nu = self.get_true_anomaly(t)
        r = (self.sma*(1-(self.ecc**2))) / (1 + self.ecc*cos(nu))
        return r

    # Step 5: Calculate specific angular momentum
    def get_specific_angular_momentum(self):
        h = np.sqrt(self.sgp*self.sma*(1-(self.ecc**2)))
        return h

    # Step 6: calculate position components in Cartesian coordinates
    def get_orbital_position(self, t):
        r = self.get_radius(t)
        nu = self.get_true_anomaly(t)

        x = r*(cos(self.raan)*cos(self.argp + nu) 
        - sin(self.raan)*sin(self.argp + nu)*cos(self.inc))

        y = r*(sin(self.raan)*cos(self.argp + nu)
        + cos(self.raan)*sin(self.argp + nu)*cos(self.inc))

        z = r*(sin(self.inc)*sin(self.argp + nu))

        return x, y, z

    # Step 7: Determine velocity components in cartesian coordinates
    def get_orbital_velocity(self, t):
        r = self.get_radius(t)
        nu = self.get_true_anomaly(t)
        h = self.get_specific_angular_momentum()
        x, y, z = self.get_orbital_position(t)
        p = self.sma*(1-(self.ecc**2))


        vx = ((x*h*self.ecc)/(r*p))*sin(nu)
        - (h/r)*(cos(self.raan)*sin(self.argp + nu)
        + sin(self.raan)*cos(self.argp + nu)*cos(self.inc))

        vy = ((y*h*self.ecc)/(r*p))*sin(nu)
        - (h/r)*(sin(self.raan)*sin(self.argp + nu)
        - cos(self.raan)*cos(self.argp + nu)*cos(self.inc))

        vz = ((z*h*self.ecc)/(r*p))*sin(nu)
        + (h/r)*sin(self.inc)*cos(self.argp + nu)

        return vx, vy, vz
        # TODO: something wrong with velocity. Fix. Check out the
        # rene-schwarz.com algorithm.

    def get_orbital_period(self):
        T = 2*np.pi*np.sqrt((self.sma**3)/self.sgp)
        return T
        
    def propagate(self):
        pass

        

    