from django.urls import path
from . import views

urlpatterns = [
    path('data/', views.getData), # Make sure this matches your React axios call!
]