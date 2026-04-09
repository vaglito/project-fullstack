from rest_framework import serializers
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ("id", "email", "username", "password", "first_name", "last_name")

    def validate(self, attrs):
        # Normalizar el correo electrónico (minúsculas y sin espacios)
        if attrs.get("email"):
            attrs["email"] = attrs["email"].strip().lower()
        # Eliminar espacios innecesarios en otros campos de texto
        if attrs.get("username"):
            attrs["username"] = attrs["username"].strip()
        if attrs.get("first_name"):
            attrs["first_name"] = attrs["first_name"].strip()
        if attrs.get("last_name"):
            attrs["last_name"] = attrs["last_name"].strip()
        return super().validate(attrs)

    def create(self, validated_data):
        # Creamos al usuario con el manager personalizado que encriptará la contraseña
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            username=validated_data.get("username", ""),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )

        # Obtenemos o creamos el grupo 'user' y asignamos al usuario recién creado
        group, created = Group.objects.get_or_create(name="user")
        user.groups.add(group)

        return user
