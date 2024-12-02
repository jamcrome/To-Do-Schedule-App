from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class App_user(AbstractUser):
    email = models.CharField(unique=True, max_length=255)
    display_name = models.CharField(default='unknown', max_length=50)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[]