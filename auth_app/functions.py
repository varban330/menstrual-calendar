import cloudinary
from cloudinary.uploader import upload
import cloudinary.api
import base64
from google.oauth2 import id_token
from google.auth.transport import requests


def upload_to_cloudinary(imagestr):
    imagestr = imagestr[22:]
    cloudinary.config( cloud_name = "do8xzkgcs", api_key = "465497811255386", api_secret = "wmOrdnc4O_xUxcZPMjjEaBtI_O0")
    with open("my_image.png", "wb") as imgFile:
        imgFile.write(base64.b64decode(imagestr))
    x = upload("my_image.png")
    return x


def validate_google_token(token):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "607848625587-ts150js5ijmrao95jd72k1jm88v1jj32.apps.googleusercontent.com")

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        userid = idinfo['sub']
        return True, userid
    except ValueError:
        return False, None
