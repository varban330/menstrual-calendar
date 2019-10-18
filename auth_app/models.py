from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    profile_pic = models.CharField(max_length = 1000)
    cycle_time = models.IntegerField(default = 28)
    lasting_time = models.IntegerField(default = 4)
    first_login = models.BooleanField(default = True)

    def __str__(self):
        string = self.user.username
        return string
