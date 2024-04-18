from django.db import models

class Game(models.Model):
    username = models.CharField(max_length=100)
    wpm = models.FloatField()

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=255)  # needs to be hashed and salted
    country = models.CharField(max_length=100)
    keyboard = models.CharField(max_length=100)
