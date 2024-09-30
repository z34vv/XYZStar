from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('Home.urls')),
    # path('product/', include('Product.urls')),
    path('contact/', include("Contact.urls")),
]
