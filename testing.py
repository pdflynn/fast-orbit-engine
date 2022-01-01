# This is following a tutorial by Alfonso Gonzalez
# https://www.youtube.com/watch?v=7JY44m6eemo&t=0s

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import ode
from mpl_toolkits.mplot3d import Axes3D
import plotly.graph_objects as go
import plotly.io as pio
from Orbit import *

r_earth = 6371000
earth_mu = 3.986004418e14

# deprecated
def plot(r):
    plt.style.use('dark_background')
    fig = plt.figure(figsize=(20,20))
    ax = fig.add_subplot(111, projection='3d')

    ax.xaxis.set_pane_color((1.0, 1.0, 1.0, 0.0))
    ax.yaxis.set_pane_color((1.0, 1.0, 1.0, 0.0))
    ax.zaxis.set_pane_color((1.0, 1.0, 1.0, 0.0))

    plt.axis('off')
    plt.grid('off')

    # Plot trajectory and starting point
    ax.plot(r[:,0], r[:,1], r[:,2], 'w')
    ax.plot([r[0,0]], [r[0,1]], [r[0,2]], 'wo')

    r_plot = r_earth

    # Plot Earth
    _u,_v = np.mgrid[0:2*np.pi:40j,0:np.pi:20j]
    _x = r_plot*np.cos(_u)*np.sin(_v)
    _y = r_plot*np.sin(_u)*np.sin(_v)
    _z = r_plot*np.cos(_v)
    ax.plot_surface(_x,_y,_z,cmap='Greens')
    
    l=r_plot*1.8
    x,y,z=[[0,0,0],[0,0,0],[0,0,0]]
    u,v,w=[[l,0,0],[0,l,0],[0,0,l]]
    ax.quiver(x,y,z,u,v,w,color='w')

    # Check for custom axes limits
    max_val = np.max(np.abs(r))

    # Set labels and title
    ax.set_xlim([-max_val, max_val])
    ax.set_ylim([-max_val, max_val])
    ax.set_zlim([-max_val, max_val])
    ax.set_xlabel('X (km)')
    ax.set_ylabel('Y (km)')
    ax.set_zlabel('Z (km)')
    # ax.set_aspect('equal')
    plt.legend(['Trajectory', 'Starting Position'])
    
    plt.show()

# Creates a plotly mesh consisting of a sphere
def sphere_plot(size, clr, dist=0):
    theta = np.linspace(0, 2*np.pi, 25)
    phi = np.linspace(0, np.pi, 25)

    x0 = dist + size * np.outer(np.cos(theta), np.sin(phi))
    y0 = size * np.outer(np.sin(theta), np.sin(phi))
    z0 = size * np.outer(np.ones(25), np.cos(phi))

    trace = go.Surface(x = x0, y = y0, z = z0, colorscale = [[0,clr], [1,clr]], opacity=0.5)
    trace.update(showscale=False)
    
    return trace

# Creates a plotly mesh consisting of an orbit trace
def orbit_plot(rs):
    orbit = go.Scatter3d(
        x=rs[:,0], 
        y=rs[:,1], 
        z=rs[:,2],
        mode='lines',
        opacity=0.5,
        line=dict(
            color='white',
            width=3
        ))
    return orbit

def plot_alt(r):
    earth = sphere_plot(r_earth, 'green', 0) # Earth
    orbit1 = orbit_plot(rs)

    fig = go.Figure(
        data=[earth, orbit1],
        layout=go.Layout(
            template='plotly_dark',
            title="Satellite Orbit",
            margin=dict( # Keeps shape aspect ratio fixed
                r=10,
                l=10,
                b=10,
                t=10
            ),
            # scene=dict(
            #     xaxis=dict(
            #         showgrid=False,
            #         zeroline=False,
            #         visible=False
            #     ),
            #     yaxis = dict(
            #         showgrid=False,
            #         zeroline=False,
            #         visible=False
            #     ),
            #     zaxis = dict(
            #         showgrid=False,
            #         zeroline=False,
            #         visible=False
            #     )
            # )
        ))
    fig.show()



# This is our Gravitation ODE to solve
def orbit_ode(t, y, mu):
    # Recall the orbit can be defined by two 3D vectors
    # The R vector is radius, V vector is velocity
    rx, ry, rz, vx, vy, vz = y

    # Convert position vector to numpy array
    r = np.array([rx, ry, rz])

    # Take the magnitude of r
    norm_r = np.linalg.norm(r)

    # Define the two-body acceleration
    # Recall this is derived from Newton's Universal Law of Gravitation
    ax, ay, az = -r*mu/norm_r**3

    return [vx, vy, vz, ax, ay, az]

# Main script (propagates orbit)
if __name__ == '__main__':

    # # Set up orbit initial conditions
    # r_mag = r_earth + 500 # km
    # v_mag = np.sqrt(earth_mu / r_mag) # km/sec

    # # Set up initial position and velocity vectors
    # r0 = [r_mag, 0, 0]
    # v0 = [0, v_mag, 0]

    circular = Orbit(0, 2*r_earth+100000, np.deg2rad(10), 0, 0, 0)
    x0, y0, z0 = circular.get_orbital_position(0)
    vx0, vy0, vz0 = circular.get_orbital_velocity(0)

    r0 = [x0, y0, z0]
    v0 = [vx0, vy0, vz0]

    print(circular.get_orbital_period())
    print(r0)
    print(v0)

    tspan = 1000*60.0
    dt = 100.0

    n_steps = int(np.ceil(tspan/dt))

    # Array initialization
    ys = np.zeros((n_steps, 6)) # 6D array for all 6 state variables
    ts = np.zeros((n_steps, 1)) # 1D array for time

    # Initial conditions (concatenate python arrays for state variables)
    # We're solving for the first step
    y0 = r0 + v0
    ys[0] = np.array(y0)
    step=1

    # Solver
    solver = ode(orbit_ode)
    solver.set_integrator('lsoda')
    solver.set_initial_value(y0, 0)
    solver.set_f_params(earth_mu)

    # Propagate the orbit!
    while solver.successful() and step < n_steps:
        solver.integrate(solver.t + dt)
        ts[step] = solver.t
        ys[step] = solver.y
        step += 1
    
    rs = ys[:,:3]

    # print(rs[:,:3])

    plot_alt(rs)

# if :
#     plot_alt(100)