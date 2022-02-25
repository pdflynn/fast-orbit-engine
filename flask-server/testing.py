# This is following a tutorial by Alfonso Gonzalez
# https://www.youtube.com/watch?v=7JY44m6eemo&t=0s

import numpy as np
from Orbit import *


r_earth = 6371000
earth_mu = 3.986004418e14


# # Main script (propagates orbit)
if __name__ == '__main__':

    orbit1 = Orbit(8000000, 0, np.deg2rad(0), np.deg2rad(0), 0, 0)
    ys1, ts1 = orbit1.propagate(dt=30)
    rs1 = ys1[:, :3]
    l_arc, theta, r_cone, h_cone = orbit1.get_fov()

    l_arc *= 1e-6
    theta = np.rad2deg(theta)
    r_cone *= 1e-6
    h_cone *= 1e-6

    with open('output.txt', 'w') as f:
        x = rs1[:, 0] / 1e6
        y = rs1[:, 1] / 1e6
        z = rs1[:, 2] / 1e6

        f.write("const t = [")
        for i in range(0, len(ts1)-1):
            f.write(str(ts1[i]) + ', ')
        f.write(str(ts1[len(ts1)-1]) + '];\n')

        f.write("const x = [")
        for i in range(0, len(x)-1):
            f.write(str(x[i]) + ', ')
        f.write(str(x[len(x)-1]) + '];\n')

        f.write("const y = [")
        for i in range(0, len(y)-1):
            f.write(str(y[i]) + ', ')
        f.write(str(y[len(y)-1]) + '];\n')

        f.write("const z = [")
        for i in range(0, len(z)-1):
            f.write(str(z[i]) + ', ')
        f.write(str(z[len(z)-1]) + '];\n')

        f.write("const l_arc = [")
        for i in range(0, len(l_arc)-1):
            f.write(str(l_arc[i]) + ', ')
        f.write(str(l_arc[len(l_arc)-1]) + '];\n')

        f.write("const theta = [")
        for i in range(0, len(theta)-1):
            f.write(str(theta[i]) + ', ')
        f.write(str(theta[len(theta)-1]) + '];\n')

        f.write("const r_cone = [")
        for i in range(0, len(r_cone)-1):
            f.write(str(r_cone[i]) + ', ')
        f.write(str(r_cone[len(r_cone)-1]) + '];\n')

        f.write("const h_cone = [")
        for i in range(0, len(h_cone)-1):
            f.write(str(h_cone[i]) + ', ')
        f.write(str(h_cone[len(h_cone)-1]) + '];\n')


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
