from flask import Flask, jsonify
from Orbit import *


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
    return jsonify(
        [{
            'id': 0,
            'text': 'Fetch from back end',
            'sma': 8500,
            'ecc': 0,
            'inc': 0,
            'raan': 0,
            'argp': 0,
            'trueAnomaly': 0,
        }])


# Start the Flask server
if __name__ == "__main__":
    app.run(debug=True)
