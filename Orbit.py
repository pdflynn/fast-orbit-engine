# Orbit.py: Defines a Keplerian elliptical orbit
import numpy as np
import foe_constants as fc

class Orbit():
    """A representation of an orbital trajectory at epoch.

    An Orbit is defined by a 6-variable Keplerian state vector
    with true anomaly defined at epoch. Information such as the
    orbital period, and position at some t after epoch can be
    extracted from an Orbit object. Information can be returned
    in terms of Keplerian orbital elements or a Cartesian state
    vector.

    """
    def __init__(self, ecc, sma, inc, raan, argp, tra, sgp=fc.MU_EARTH):
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

        """
        self.ecc = ecc
        self.sma = sma
        self.inc = inc
        self.raan = raan
        self.argp = argp
        self.tra = tra
        self.sgp = sgp

    def get_mean_motion(self):
        n = np.sqrt(self.sgp/(self.sma**3))
        return n

    def get_orbital_period(self):
        T = 2*np.pi*np.sqrt((self.sma**3)/self.sgp)
        return T
        
    def propagate(self):
        pass

        

    