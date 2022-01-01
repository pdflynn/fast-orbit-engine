# From Alfonso Gonzalez: Newton's method of root-solving a
# single variable function.
# https://www.youtube.com/watch?v=zNd-sRzA7b8
def newtons_single(f, f_prime, x0, tol=1e-9, args=[]):
    n = 1
    dx = f(x0, args) / f_prime(x0, args)
    while abs(dx) > tol:
        x0 -= dx
        dx = f(x0, args) / f_prime(x0, args)
        n += 1

    return x0, n