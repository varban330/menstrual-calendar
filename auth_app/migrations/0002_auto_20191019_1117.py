# Generated by Django 2.2.6 on 2019-10-19 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_pic',
            field=models.CharField(blank=True, default='', max_length=1000),
        ),
    ]
