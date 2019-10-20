import cloudinary
from cloudinary.uploader import upload
import cloudinary.api
import base64

def upload_to_cloudinary(imagestr):
    with open("my_image.jpg", "wb") as imgFile:
        imgFile.write(base64.b64decode(imagestr))
    x = upload("my_image.jpg")
    print(x)
