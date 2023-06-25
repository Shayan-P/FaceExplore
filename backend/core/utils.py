from copy import deepcopy
from PIL import ImageDraw


def draw_bounding_box(img, bb):
    img = deepcopy(img)
    draw = ImageDraw.Draw(img)
    x1, y1, x2, y2 = bb
    draw.line([(x1, y1), (x2, y1)], fill='red', width=15)
    draw.line([(x2, y1), (x2, y2)], fill='red', width=15)
    draw.line([(x2, y2), (x1, y2)], fill='red', width=15)
    draw.line([(x1, y2), (x1, y1)], fill='red', width=15)
    return img
