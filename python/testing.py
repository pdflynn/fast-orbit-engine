# This is following a tutorial by Alfonso Gonzalez
# https://www.youtube.com/watch?v=7JY44m6eemo&t=0s

import numpy as np
from archive.plot_tools import *
from Orbit import *
from vpython import *


r_earth = 6371000
earth_mu = 3.986004418e14



# # Main script (propagates orbit)
# if __name__ == '__main__':

#     orbit1 = Orbit(0, 8500000, np.deg2rad(10), 0, 0, 0)
#     ys1, ts1 = orbit1.propagate()
#     rs1 = ys1[:, :3]

#     orbit2 = Orbit(0.1, 9500000, 0, 0, 0, 0)
#     ys2, ts2 = orbit2.propagate()
#     rs2 = ys2[:, :3]
    
#     earth = sphere_plot(r_earth, 'green')
#     orbit1_plot = orbit_plot(rs1)
#     orbit2_plot = orbit_plot(rs2)


#     plot_fig = space_plot([earth], axes=True)
    

#     anim_1 = orbit_animation(rs1)
#     plot_fig.update(frames=anim_1)

#     plot_fig.update_layout(updatemenus=[dict(type='buttons',
#                                     buttons=[dict(label='Play',
#                                                   method='animate',
#                                                   args=[None, 
#                                                         dict(frame=dict(redraw=True,
#                                                                         fromcurrent=True, 
#                                                                         mode='immediate')) ])])])
#     plot_fig.show()


if __name__ == '__main__':
    pass