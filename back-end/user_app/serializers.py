from rest_framework.serializers import ModelSerializer
from .models import App_user

class UserSerializer(ModelSerializer):

  class Meta:
    model = App_user
    fields = ['display_name', 'email', 'password', 'date_joined']

