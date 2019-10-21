import cloudinary
from cloudinary.uploader import upload
import cloudinary.api
import base64

def upload_to_cloudinary(imagestr):
    imagestr = imagestr[22:]
    cloudinary.config( cloud_name = "do8xzkgcs", api_key = "465497811255386", api_secret = "wmOrdnc4O_xUxcZPMjjEaBtI_O0")
    with open("my_image.png", "wb") as imgFile:
        imgFile.write(base64.b64decode(imagestr))
    x = upload("my_image.png")
    return x
