from .models import PeriodDate
from django.contrib.auth.models import User

def get_last_period_date(user):
    period_dates = PeriodDate.objects.filter(user = user)
    period_date = period_dates.filter(status = 1)[0]
    if period_date != None and !period_date.currently_on:
        content = {
        "start_date": period_date.start_date,
        "end_date": period_date.end_date,
        "currently_on": period_date.currently_on
        }
        code = 200
    elif period_date != None and period_date.currently_on:
        content = {
        "start_date": period_date.start_date,
        "currently_on": period_date.currently_on
        }
        code = 200
    else
        content = {"message": "No Date Entered"}
        code = 404
    return content, code

def set_last_period_date(user, start_date, end_date, currently_on):
     period_dates = PeriodDate.objects.filter(user = user)
     period_date = period_dates.filter(status = 1)[0]
     period_date.status = 0
     period_date.save
     
