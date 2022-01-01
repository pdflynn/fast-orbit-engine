# Orbit.py: Defines a Keplerian elliptical orbit
import numpy as np
from scipy.integrate import ode
import foe_constants as fc
import ComputationalMethods as cm
from math import cos, sin

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

    def get_cartesian(self):
        """Returns the Cartesian state vector in geocentric-equatorial reference.
        
        Description
        --------
        get_cartesian() returns the Cartesian state vector in the geocentric-equatorial
        reference system at epoch. Essentially it converts the Keplerian state vector
        to a Cartesian state vector (say, for propagating orbits)

        Credit
        --------
        Credit to Thameur Chebbi who originally developed Kepler2Carts for MATLAB.
        https://www.mathworks.com/matlabcentral/fileexchange/80632-kepler2carts
        """
        p = self.sma*(1-self.ecc**2)
        r_0 = p / (1 + self.ecc * cos(self.tra))

        # Perifocal reference system coordinates
        x_ = r_0 * cos(self.tra)
        y_ = r_0 * sin(self.tra)

        Vx_ = -(self.sgp/p)**(1/2) * sin(self.tra)
        Vy_ = (self.sgp/p)**(1/2) * (self.ecc + cos(self.tra))

        # Geocentric-equatorial reference system
        # NOTE: must use \ to continue line in python
        x = (cos(self.raan) * cos(self.argp) - sin(self.raan) * sin(self.argp) * cos(self.inc)) * x_ \
        + (-cos(self.raan) * sin(self.argp) - sin(self.raan) * cos(self.argp) * cos(self.inc)) * y_
        y = (sin(self.raan) * cos(self.argp) + cos(self.raan) * sin(self.argp) * cos(self.inc)) * x_ \
        + (-sin(self.raan) * sin(self.argp) + cos(self.raan) * cos(self.argp) * cos(self.inc)) * y_
        z = (sin(self.argp) * sin(self.inc)) * x_ + (cos(self.argp) * sin(self.inc)) * y_

        Vx = (cos(self.raan) * cos(self.argp) - sin(self.raan) * sin(self.argp) * cos(self.inc)) * Vx_ \
        + (-cos(self.raan) * sin(self.argp) - sin(self.raan) * cos(self.argp) * cos(self.inc)) * Vy_
        Vy = (sin(self.raan) * cos(self.argp) + cos(self.raan) * sin(self.argp) * cos(self.inc)) * Vx_ \
        + (-sin(self.raan) * sin(self.argp) + cos(self.raan) * cos(self.argp) * cos(self.inc)) * Vy_
        Vz = (sin(self.argp) * sin(self.inc)) * Vx_ + (cos(self.argp) * sin(self.inc)) * Vy_

        return x, y, z, Vx, Vy, Vz

    def get_orbital_period(self):
        """Returns the period of this Orbit.
        """
        T = 2*np.pi*np.sqrt((self.sma**3)/self.sgp)
        return T
        
    def propagate(self, Nperiods=1, Nsteps=100, integrator='lsoda'):
        """Propagates the orbit, returning a Cartesian state vector and time.

        Parameters
        --------
        Nperiods : int
            Defines the number of orbital periods to propagate (default 1)
        Nsteps : int
            Defines the number of steps per orbital period (default 100)
        integrator : string
            Defines which scipy integrator to use (default 'lsoda'). Other options
            include 'rk45', 'rk23', etc.
        """
        # Default one period with 100 steps per periods
        tspan = Nperiods*self.get_orbital_period()
        dt = tspan/(Nsteps*Nperiods)
        actual_steps = int(np.ceil(tspan/dt) + 1)

        ys = np.zeros((actual_steps, 6)) # State vector initialization
        ts = np.zeros((actual_steps, 1)) # Time vector initialization

        # Initial conditions
        x0, y0, z0, vx0, vy0, vz0 = self.get_cartesian()
        r0 = [x0, y0, z0]
        v0 = [vx0, vy0, vz0]

        y0 = r0 + v0 # Concatenate lists
        ys[0] = np.array(y0) # Convert to Numpy array

        # Solve using scipy integration
        step = 1
        solver = ode(cm.orbit_ode)
        solver.set_integrator(integrator)
        solver.set_initial_value(y0, 0)
        solver.set_f_params(self.sgp)

        while solver.successful() and step < actual_steps:
            solver.integrate(solver.t + dt)
            ts[step] = solver.t
            ys[step] = solver.y
            step += 1
        
        return ys, ts




        

    