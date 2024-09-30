from django.contrib import admin
from .models import Product
# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_id', 'name', 'created_at']


admin.site.register(Product, ProductAdmin)
