from django.shortcuts import render
from django.views.generic import View
# Create your views here.

class HomeView(View):
    template_name = 'frontend/home_page.html'

    def get(self,request):
        return render(request, self.template_name)
