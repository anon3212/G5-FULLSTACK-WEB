from rest_framework import serializers
from .models import Category, Product, Sale

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # This shows the category name instead of just an ID
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'stock', 'category', 'category_name']

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'