from django.conf.urls import url, include
from django.urls import path
from . import views

app_name = 'frontend'
urlpatterns = [
    # /register
    path('register', views.RegisterView.as_view(), name="register-page"),

    # /Login
    path('login', views.LoginView.as_view(), name="login-page"),
    ]
