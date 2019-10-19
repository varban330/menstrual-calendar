from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import UserProfile
from rest_framework_expiring_authtoken import views as rviews
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
            except:
                content = {"message: Some Error Occured"}
                code = 500
            return Response(data = content, status = code)
