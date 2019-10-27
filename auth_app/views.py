from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import UserProfile
from rest_framework_expiring_authtoken import views as rviews
from .functions import upload_to_cloudinary, validate_google_token
# Create your views here.

class LoginView(APIView):
    permission_classes = (AllowAny,)
    def post(self,request):
        x = rviews.ObtainExpiringAuthToken()
        if x.post(request).status_code == 200:
            token = x.post(request).data["token"]
            code = 200
            content = {'token': token}
        else:
            content = x.post(request).data
            code = x.post(request).status_code
        return Response(data=content, status = code)


class RegisterView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        try:
            user = User()
            # cleaned (normalised) data
            user.username = request.data['username']
            user.email = request.data['email']
            pwd = request.data['password']
            user.set_password(pwd)
            user.save()
            user_profile = UserProfile()
            user_profile.user = user
            user_profile.save()
            string = "Registration Successful"
            x = LoginView()
            content = x.post(request).data
            content["message"] = string
            code = x.post(request).status_code
        except Exception as e:
            string = "Sorry Registration could not be done"
            code = 400
            content = {'message': string}
        return Response(data=content, status = code)


class ChangePwd(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
            try:
                username = request.user.username
                user_profile = UserProfile.objects.filter(user = request.user)[0]
                if user_profile.google_login == True:
                    password = request.data["password"]
                    user = authenticate(username = username, password = password)
                    if user is not None:
                        pwd = request.data['new_password']
                        user.set_password(pwd)
                        user.save()
                        content = {"message: Password Changed Successfully"}
                        code = 200
                    else:
                        content = {"message: Incorrect Password"}
                        code = 401
                else:
                    content = {"message: Google Login... Can't Change Password"}
                    code = 400
            except:
                content = {"message: Some Error Occured"}
                code = 500
            return Response(data = content, status = code)


class SuccessLogin(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        user_profile = UserProfile.objects.filter(user = request.user)[0]
        content = {
                    "message": "Successful",
                    "google": user_profile.google_login
                  }
        return Response(data = content, status = 200)


class UpdateProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        try:
            user = request.user
            user_profile = UserProfile.objects.filter(user = request.user)[0]
            username = user.username
            if user_profile.google_login == True:
                username = user.email
            content = {
                "username": username,
                "email": user.email,
                "fname": user.first_name,
                "lname": user.last_name,
                "ctime": user_profile.cycle_time,
                "ltime": user_profile.lasting_time,
                "profile_pic": user_profile.profile_pic
            }
            code = 200;
        except:
            content = {"message": "Fetching Failed"}
            code = 400
        return Response(data = content, status = code)

    def post(self,request):
        try:
            user = request.user
            user.first_name = request.data["fname"]
            user.last_name = request.data["lname"]
            user.save()
            user_profile = UserProfile.objects.filter(user = request.user)[0]
            if not request.data['profile'].startswith("http"):
                x = upload_to_cloudinary(request.data['profile'])
                print(x["url"])
                user_profile.profile_pic = x["url"]
            user_profile.cycle_time = request.data["ctime"]
            user_profile.lasting_time = request.data["ltime"]
            user_profile.save()
            content = {
                "username": user.username,
                "email": user.email,
                "fname": user.first_name,
                "lname": user.last_name,
                "ctime": user_profile.cycle_time,
                "ltime": user_profile.lasting_time,
                "profile_pic": user_profile.profile_pic
            }
            code = 200
        except:
            content = {"message": "Updation Failed"}
            code = 400
        return Response(data = content, status = code)


class ProfileCompletion(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        try:
            value = 57.4
            user = request.user
            user_profile = UserProfile.objects.filter(user = request.user)[0]
            if user.first_name != "":
                value+=14.2
            if user.last_name != "":
                value+=14.2
            if user_profile.profile_pic != "https://res.cloudinary.com/do8xzkgcs/image/upload/v1571618470/gbvmr9fwrwcz9xp0ycos.png":
                value+=14.2

            content = {"value": str(value)}
            code = 200
        except:
            content = {"message": "Fetching Failed"}
            code = 400
        return Response(data = content, status = code)


class GoogleRegister(APIView):
    permission_classes = (AllowAny,)

    def post(self,request):
        try:
            if validate_google_token(request.data['id_token']):
                user = User()
                username = request.data['email']
                request.data["username"] = ''.join(e for e in username if e.isalnum())
                user.username = request.data["username"]
                user.email = request.data['email']
                user.first_name = request.data['f_name']
                user.last_name = request.data['l_name']
                pwd = "qpalzmqp"
                request.data["password"] = pwd
                user.set_password(pwd)
                user.save()
                user_profile = UserProfile()
                user_profile.user = user
                user_profile.profile_pic = request.data["img_url"]
                user_profile.google_login = True
                user_profile.save()
                string = "Registration Successful"
                x = LoginView()
                content = x.post(request).data
                content["message"] = string
                code = x.post(request).status_code
            else:
                string = "Invalid Google ID"
                code = 400
                content = {'message': string}
        except Exception as e:
            string = "Sorry Registration could not be done"
            code = 400
            content = {'message': string}
        return Response(data=content, status = code)


class GoogleLogin(APIView):
    permission_classes = (AllowAny,)

    def post(self,request):
        if validate_google_token(request.data['id_token']):
            x = rviews.ObtainExpiringAuthToken()
            username = request.data['email']
            request.data["username"] = ''.join(e for e in username if e.isalnum())
            pwd = "qpalzmqp"
            request.data["password"] = pwd
            if x.post(request).status_code == 200:
                token = x.post(request).data["token"]
                code = 200
                content = {'token': token}
            else:
                content = x.post(request).data
                code = x.post(request).status_code
        else:
            string = "Invalid Google ID"
            code = 400
            content = {'message': string}
        return Response(data=content, status = code)
