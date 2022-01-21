from flask import Flask
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
    return {
        't': [1, 2, 3, 4],
        'x': [0, 0, 0, 0],
        'y': [0, 0, 0, 0],
        'z': [0, 0, 0, 0],
    }


# Start the Flask server
if __name__ == "__main__":
    app.run(debug=True)
