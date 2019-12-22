from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import PeriodDate

# Create your views here.
class UpdatePeriodDate(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        pass
