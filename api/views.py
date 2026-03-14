from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .models import Category, Product, Sale
from .serializers import CategorySerializer, ProductSerializer, SaleSerializer

@api_view(['GET'])
def getData(request):
    person = {'name': 'Project Admin', 'status': 'Connected'}
    return Response(person)
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer