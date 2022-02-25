# fast-orbit-engine beta 0.1

# Description

A simple satellite orbit propagator and visulaization tool using 6 Keplerian orbital elements. This tool started for two reasons: first, I was learning orbital mechanics and wanted a tool to interactively visualize orbits. Second, I thought this might be a good opportunity for further work by combining this application with satellite-links-and-mapping (SLAM), a tool used for communication satellite coverage area mapping and link analysis that I previously started. The tool uses a React frontend built up with react-three-fiber for visualizations. A custom visualization engine using R3F was selected over graphing tools such as matplotlib or plotly to improve visuals and improve performance (framerate). The backend orbit propagator is Python-based, currently supporting two-body orbital mechanics and served with a Flask API.

# User Interface

![FOEInterface](https://raw.githubusercontent.com/pdflynn/fast-orbit-engine/main/ui.png)

The FOE interface is split into three distinct areas:

- The majority of the screen is divided into the "view pane," which interactively visualizes the current orbits.
- The left-side of the screen, called the "control pane," allows the user to adjust the simulation time (measured in seconds of simulation time per second of real time) and add/remove orbits.
- The top of the screeen, called the "banner," is mostly unused but shows the title of the application. Further versions will take advantage of this section.

# Current Features

- ~~Fully-functional~~ Somewhat broken two-body orbital mechanics engine supporting an arbitrary number of small bodies orbiting a single large body (hardcoded as Earth for now).
- Simulation time adjustment, allowing the user to increase/decrease the rate of the simulation. Time should theoretically be independent of framerate with the way this is programmed.
- Adding/removing individual orbits, which are specified using 6 Keplerian [orbital elements](https://en.wikipedia.org/wiki/Orbital_elements).
- 8K Textured Earth with normal maps and specular maps
- Background stars (not accurate to Milky Way) that can be turned on/off
- Rotating Earth with a period of one sidereal day (approximately 24h, 56m, 4s).

# Recently Added

This list pulls from "Upcoming Features," see below.

- ~~Revamping the look of each orbit in the control pane (currently each orbit looks to large imo, on a 1080p screen you can only fit 4).~~ **Done 02/23/2022**. Added a scrollbar. They are still too big imo but this is a lower priority now.
- ~~Prettier Earth. Earth is represented as a green sphere using R3F. This could be textured for a nicer look.~~ **Done 02/23/2022**. There was an online tutorial on how to do exactly this with R3f, so I essentially was able to copy the code over.
- ~~Make the Earth and other celestial bodies rotate. This seems like an obvious one, but the Earth rotates as object orbit. We can then define positions in the geocentric equatorial coordinate system (x-axis points towards the vernal equinox, z-axis along Earth's axis)~~ **Done 02/23/2022**. Basic rotation is implemented and time-accurate, but this introduced a strange bug.
- ~~XYZ axes indicator~~ **Done 02/24/2022**. I think WebGL uses a left-handed coordinate system, that could also maybe be causing issues with the directions of orbits?

# Upcoming Features

This list is intended to capture my intent for FOE in its near-future development. I have a ton of ideas so this is by no means an exhaustive list. My real intent with this application is to build a basis for a future satellite communication simulator, so once these features are in the empasis will be less on the "GNC" features and more on the communications features. I am also extremely busy with my senior year of undergrad so no promises on development time.

- Color-coding individual orbits according to color palette input.
- Mass orbital insertion. Say you want to populate one orbital plane with 35 satellites separated by 10 degrees each. You should be able to do this with a wizard/few clicks instead of having to manually input 35 satellites.
- Celestial body selection. We are interested in simulating orbits not just around the Earth, but also around the Moon, Mars, the Sun, Venus, etc.
- Conversion between apoapsis/periapsis and semimajor axis. I think that describing an orbit using the former terms is more intuitive than describing it with the semimajor axis. Input should be allowed either way.
- Spacecraft attitude. A basic description of where each satellite is pointing should be stored in each orbit. We should also allow for the orbiting body to "track" in many ways, either by remaining fixed (no attitude control) or continuously pointing at some fixed point or directly down at the celestial body.
- Field of view calculation and visualization. Since celestial bodies are assumed to be perfectly spherical in this engine, the calculation of a satellite's field-of-view should be relatively trivial. We would also like to visualize this on the celestial body.
- Orbit propagator: I could rewrite this using a different method. Right now, everything is set up in a Cartesian coordinate system. But since this is just a Keplerian propagator, why not rewrite the engine to just propagate using Kepler's equation? Then, coordinates can be transformed to the geocentric equatorial coordinate system in Cartesian coordinates or right ascension/declanation. This might fix some of the known bugs (especially with high-inclination orbits)
- Satellite icon replacement. Satellites are currently displayed as spheres, but this should change to a "prettier" icon (or ideally we should allow the user to select what icon they want).
- Satellite "grouping" / organization in the control pane. If we have 80 satellites in different orbital planes, we probably want to organize them by orbital plane and not just have a really long scrollbar of unrelated orbits.

# Known Bugs

- Some orbits fail to propagate, yielding a divide-by-zero error or similar. One example problematic orbit is (Semimajor axis: 7200 km; Eccentricity: 0 deg; Inclination: 80 deg; Right Ascension of the Ascending Node: 0 deg; Argument of Periapsis: 0 deg; True Anomaly at Epoch: 0 deg). I think this issue has to do with high-inclination orbits and I will need to check out the ODE solver.
- ~~Upon cancelling the "add orbit" window by double clicking the screen, all orbits disappear for a split second and then reappear~~ Ignoring this for now, it's just a small graphical bug that isn't really noticable on fast PCs.
- ~~When we press "Add Orbit," "Hide Stars," or exit the add orbit menu (by cancelling or by adding an orbit) the Earth spins much faster for a few seconds but the orbits maintain their time-accurate course.~~ **02/24/2022**: Fixed, but there are still some issues with Earth's rotation speed when approaching large simulation times (greater than ~5000x)
- Orbits appear to propagate in the retrograde direction. An orbit with an inclination of 0 should travel in the same direction as the rotation of the Earth. However, orbits travel in the opposite direction. **Update 02/24/2022**: Temporary fix by adding 180 to all inclinations. But I still think something is wrong with the propagator.

# Installation

TODO: write this section.

FOE isn't really in a state yet where the user will be happy with using it. However, if you do want to install you should just be able to clone the repo, launch the Flask server in `flask-server` after installing the libraries in `requirements.txt` and then run the react server in `foe`. Then, just go to `localhost:3000` in your browser.

# Credits

- Thank you to www.solarsystemscope.com for the planet textures. https://www.solarsystemscope.com/textures/
- Thank you to https://github.com/ipenywis/react-3d-earth/tree/master/src for pretty-Earth code
