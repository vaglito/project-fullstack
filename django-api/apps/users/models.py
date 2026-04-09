from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class User(AbstractUser):
    """
    Modelo de usuario personalizado que usa email para iniciar sesión.
    Mantiene todos los campos por defecto de AbstractUser:
    - username, first_name, last_name, email
    - is_staff, is_active, is_superuser
    - date_joined, last_login
    - groups, user_permissions
    """

    email = models.EmailField("correo electrónico", unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username"
    ]  # campos requeridos además del USERNAME_FIELD y password

    objects = CustomUserManager()

    class Meta(AbstractUser.Meta):
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"

    def __str__(self):
        return self.email
