from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('company/', views.CompanyInfoView.as_view(), name='company'),
    path('business/', views.BusinessView.as_view(), name='business'),
    path('equipments/', views.EquipmentsView.as_view(), name='equips'),
    path('contact/', views.ContactView.as_view(), name='contact'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
