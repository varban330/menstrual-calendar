from django.conf.urls import url, include
from django.urls import path
from . import views

urlpatterns = [
    #/
    path('', views.HomeView.as_view(), name="home-page"),
    ]
