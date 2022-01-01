import numpy as np
import plotly.graph_objects as go
import plotly.io as pio

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

def space_plot(plotting_data, axes=False):
    default_layout = go.Layout(
            template='plotly_dark',
            title="Satellite Orbit",
            margin=dict( # Keeps shape aspect ratio fixed
                r=10,
                l=10,
                b=10,
                t=10
            ))
    fig = go.Figure(
        data=plotting_data,
        layout=default_layout)
    
    # if ~axes:
    #     fig.update_layout(go.Layout(
    #         template='plotly_dark',
    #         title="Satellite Orbit",
    #         margin=dict( # Keeps shape aspect ratio fixed
    #             r=10,
    #             l=10,
    #             b=10,
    #             t=10
    #         ),
    #         scene=dict(
    #             xaxis=dict(
    #                 showgrid=False,
    #                 zeroline=False,
    #                 visible=False
    #             ),
    #             yaxis = dict(
    #                 showgrid=False,
    #                 zeroline=False,
    #                 visible=False
    #             ),
    #             zaxis = dict(
    #                 showgrid=False,
    #                 zeroline=False,
    #                 visible=False
    #             )
    #         )
    #     ))

    return fig
