from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("owner", "created_at", "updated_at")

    def create(self, validated_data):
        # Asignar el usuario actual como propietario automáticamente
        request = self.context.get("request")
        validated_data["owner"] = request.user
        return super().create(validated_data)
