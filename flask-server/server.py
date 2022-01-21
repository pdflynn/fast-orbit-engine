from flask import Flask, jsonify, request
from Orbit import *
import numpy as np


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
        # TODO: casting is probably lazy, make form give numbers?
        new_orbit = Orbit(
            float(data.get('sma')),
            float(data.get('ecc')),
            float(data.get('inc')),
            float(data.get('raan')),
            float(data.get('argp')),
            float(data.get('tra'))
        )
        ys, ts = new_orbit.propagate(dt=30)
        rs = ys[:, :3]
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


# Start the Flask server
if __name__ == "__main__":
    app.run(debug=True)
