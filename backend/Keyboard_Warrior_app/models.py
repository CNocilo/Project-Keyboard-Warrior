from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import uuid

MAX_USERNAME_LEN = 100
MAX_PASS_LEN = 100

class Game(models.Model):
    gameid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=MAX_USERNAME_LEN)
    wpm = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Game(ID: {self.gameid}, Username: {self.username}, WPM: {self.wpm}, Timestamp: {self.timestamp})"
 
    
class GameUserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)

class GameUser(AbstractUser):
    username = models.CharField(max_length=MAX_USERNAME_LEN, unique=True)
    display_name = models.CharField(max_length=MAX_USERNAME_LEN)
    country = models.CharField(max_length=15)
    keyboard = models.CharField(max_length=15)
    description = models.TextField(blank=True)

    objects = GameUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['display_name']

    def __str__(self):
        return f"User(username: {self.username}, display_name: {self.display_name}, country: {self.country}, keyboard: {self.keyboard}, description: \"{self.description}\")"    
    
