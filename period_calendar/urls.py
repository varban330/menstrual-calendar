"""period_calendar URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include,url
from rest_framework.authtoken.views import obtain_auth_token
from auth_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # /api/register/
    path('api/register/', views.RegisterView.as_view(), name='register'),
    # /api/login/
    path('api/login/', views.LoginView.as_view(), name='login'),
    # /api/change-pwd/
    path('api/change-pwd/', views.ChangePwd.as_view(), name='change-pwd'),
    # /api/logged-in/
    path('api/logged-in/', views.SuccessLogin.as_view(), name='logged-in'),
    # /api/profile/
    path('api/profile/', views.UpdateProfile.as_view(), name='update-profile'),
    # Front end urls
    path('', include('frontend.urls')),

]
