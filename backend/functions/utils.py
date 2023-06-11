import numpy as np


def cos_similarity(a, b):
    a = a.reshape(-1)
    b = b.reshape(-1)
    return (a @ b) / np.linalg.norm(a) / np.linalg.norm(b)
