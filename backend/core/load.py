import face_recognition
import numpy as np

from .models import ImageModel
from scipy.spatial.distance import pdist
from scipy.cluster.hierarchy import linkage, fcluster
from .models import ClusterModel, FaceModel


def load_faces(item: ImageModel):
    """returns face embeddings"""
    image = face_recognition.load_image_file(item.filepath)
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)
    face_locations = list(map(from_fr_bb, face_locations))  # apply correction
    item.faces = [FaceModel(item, emb, bb) for emb, bb in zip(face_encodings, face_locations)]
    return item


def from_fr_bb(bb):
    (a, b, c, d) = bb
    return d, a, b, c


def to_fr_bb(bb):
    (d, a, b, c) = bb
    return a, b, c, d


def load_clusters(all_faces: [FaceModel]) -> [ClusterModel]:
    encodings = [face.embedding / np.linalg.norm(face.embedding) for face in all_faces]
    distances = pdist(encodings, metric='cosine')
    linkage_matrix = linkage(distances, method='complete')
    threshold = 0.1  # todo optimize these hyperparameters
    labels = fcluster(linkage_matrix, threshold, criterion='distance')

    cluster_map = {}
    for face, label in zip(all_faces, labels):
        mp = cluster_map.get(label, [])
        cluster_map[label] = mp
        mp.append(face)
    all_clusters = [ClusterModel(faces) for faces in cluster_map.values()]
    return all_clusters




# to_pil = transforms.ToPILImage()
#
# device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
# mtcnn = MTCNN(  # todo optimize the setting of mtcnn
#     image_size=160, margin=0, min_face_size=20,
#     thresholds=[0.6, 0.7, 0.7], factor=0.709, post_process=True, select_largest=False, keep_all=True,
#     device=device
# )


# todo. have an image preprocessing phase here
