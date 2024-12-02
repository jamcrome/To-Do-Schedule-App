from django.shortcuts import render
from .models import App_user
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from rest_framework.status import (
  HTTP_200_OK,
  HTTP_204_NO_CONTENT,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST
)

from django.contrib.auth import login, logout, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.
class SignUp(APIView):
    
  def post(self, request):
    data = request.data.copy()
    data['username'] = request.data.get("username", request.data.get("email"))
    new_user = App_user(**data)
    try:
      new_user.full_clean()
      new_user.save()
      new_user.set_password(data.get("password"))
      new_user.save()
      login(request, new_user)
      token = Token.objects.create(user = new_user)
      return Response({"user":new_user.display_name, "email":new_user.email, "token":token.key}, status=HTTP_201_CREATED)
    except ValidationError as e:
      print(e)
      return Response(e, status=HTTP_400_BAD_REQUEST)

class LogIn(APIView):
    
  def post(self, request):
    data = request.data.copy()
    user = authenticate(username=data.get("email"), password=data.get("password"))

    if user:
      login(request, user)
      token, created = Token.objects.get_or_create(user = user)
      return Response({"user": user.display_name, "token": token.key}, status=HTTP_200_OK)
    return Response("No user matching credentials", status=HTTP_400_BAD_REQUEST)

class TokenReq(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes = [IsAuthenticated]

class LogOut(TokenReq):

  def post(self, request):
    request.user.auth_token.delete()
    logout(request)
    return Response(status=HTTP_204_NO_CONTENT)
  
class Info(TokenReq):

  def get(self, request):
    current_user = App_user.objects.get(email=request.user.email)
    ser_user = UserSerializer(current_user)
    return Response(ser_user.data)
    