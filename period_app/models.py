from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PeriodDate(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    start_date = models.DateTimeField(null = False)
    end_date = models.DateTimeField(null = True)
    status = models.IntegerField(default = 1)
    currently_on = models.BooleanField(default = False)

    def __str__(self):
        string = self.user.username
        return string
