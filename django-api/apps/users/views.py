from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserRegistrationSerializer


class UserRegistrationView(generics.CreateAPIView):
    """
    Vista para registrar nuevos usuarios.
    """

    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
