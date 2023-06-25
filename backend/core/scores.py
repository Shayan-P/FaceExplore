import numpy as np
from .models import ImageModel


def cos_similarity(a, b):
    a = a.reshape(-1)
    b = b.reshape(-1)
    return (a @ b) / np.linalg.norm(a) / np.linalg.norm(b)


def similarity_item(all_samples, item: ImageModel):
    if len(item.faces) == 0:
        return 0
    sample_embeddings = []
    global_embeddings = []

    global_embeddings.extend([face.embedding for face in item.faces])
    for item in all_samples:
        for face in item.faces:
            sample_embeddings.append(face.embedding)
    return similarity_embeddings(global_embeddings, sample_embeddings)


def similarity_cluster(all_samples, cluster):
    sample_embeddings = []
    global_embeddings = []

    for face in cluster.faces:
        global_embeddings.append(face.embedding)
    for item in all_samples:
        for face in item.faces:
            sample_embeddings.append(face.embedding)
    return similarity_embeddings(global_embeddings, sample_embeddings)


def similarity_embeddings(global_embeddings, sample_embeddings):
    global_embeddings = np.array(global_embeddings)
    global_embeddings = global_embeddings / np.linalg.norm(global_embeddings, axis=-1)[:, None]
    sample_embeddings = np.array(sample_embeddings)
    sample_embeddings = sample_embeddings / np.linalg.norm(sample_embeddings, axis=-1)[:, None]

    matrix = np.sum(global_embeddings[:, None, :] * sample_embeddings[None, :, :], axis=-1)
    matrix_mean = np.mean(matrix, axis=1)
    mx = np.max(matrix_mean)  # average over samples. maximum over globals
    idx = np.argmax(matrix_mean)
    return mx, idx
