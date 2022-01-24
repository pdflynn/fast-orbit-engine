from flask import Flask, jsonify, request
from Orbit import *
import numpy as np
import foe_constants as fc


# Create Flask app
app = Flask(__name__)


@app.route('/')
def home():
    return "Home page!"


# Route for handling the creation of a new Orbit
# We need to pass the orbital parameters into the
# back-end and then extract the propagated orbit
@app.route('/new_orbit', methods=['GET', 'POST'])
def new_orbit():
    if request.method == 'POST':
        data = request.json  # contains key-values for the new orbit

        # propagate the orbit using Orbit.py
        # converts to m for sma and deg for other elements
        new_orbit = Orbit(
            float(data.get('sma'))*1e3,
            float(data.get('ecc')),
            np.deg2rad(float(data.get('inc'))),
            np.deg2rad(float(data.get('raan'))),
            np.deg2rad(float(data.get('argp'))),
            np.deg2rad(float(data.get('tra')))
        )
        ys, ts = new_orbit.propagate(dt=30)
        rs = ys[:, :3]
        # divide by 1 million for coordinates of simulation (vs actual coords)
        x = rs[:, 0] / 1e6
        y = rs[:, 1] / 1e6
        z = rs[:, 2] / 1e6

    return jsonify(
        {
            'id': data.get('id'),
            't': ts.tolist(),
            'x': x.tolist(),
            'y': y.tolist(),
            'z': z.tolist(),
        })


@app.route('/get_gravitational_parameter', methods=['POST', 'GET'])
def get_sgp():
    if request.method == 'POST':
        data = request.json
        requested_sgp = data.get('mu').lower()
        try:
            sgp = fc.MU_DICT[requested_sgp]
        except:
            sgp = 'NOT_FOUND'

        return jsonify(
            {
                'mu': sgp
            }
        )


# Start the Flask server
if __name__ == "__main__":
    app.run(debug=True)
