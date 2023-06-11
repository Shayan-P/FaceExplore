import torch
import torchvision.models as models
import torchvision.transforms as transforms

from PIL import Image
from facenet_pytorch import MTCNN


to_pil = transforms.ToPILImage()

# Load the pre-trained ResNet model
resnet = models.resnet50(pretrained=True)
resnet.eval()

# Define the image transformation
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load the pre-trained MTCNN model
mtcnn = MTCNN()


def get_image_embedding(image: Image):
    """returns embedding of image"""
    image = transform(image)
    image = image.unsqueeze(0)
    with torch.no_grad():
        embedding = resnet(image).numpy().reshape(-1)
    return embedding


def get_faces_images(image: Image):
    """returns bounding box over faces"""
    image = image.convert('RGB')
    boxes, _ = mtcnn.detect(image)
    if boxes is None:
        return []
    return boxes
