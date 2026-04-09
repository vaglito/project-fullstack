from django.db import models
from django.conf import settings


class Project(models.Model):
    name = models.CharField("nombre", max_length=255)
    description = models.TextField("descripción", blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects",
        verbose_name="propietario",
    )
    created_at = models.DateTimeField("fecha de creación", auto_now_add=True)
    updated_at = models.DateTimeField("fecha de actualización", auto_now=True)

    class Meta:
        verbose_name = "proyecto"
        verbose_name_plural = "proyectos"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
