from django.db import models

# Create your models here.


class Product(models.Model):
    product_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    img = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)
