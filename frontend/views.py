from django.shortcuts import render
from django.views.generic import View
# Create your views here.

class RegisterView(View):
    template_name = 'frontend/register_page.html'

    def get(self,request):
        return render(request, self.template_name)


class LoginView(View):
    template_name = 'frontend/login_page.html'

    def get(self,request):
        return render(request, self.template_name)
