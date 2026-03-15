from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()

    def __str__(self):
        return self.name

class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    date_sold = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # 1. Get the product instance
        product = self.product
        
        # 2. Subtract the quantity from the stock
        product.stock = product.stock - self.quantity
        
        # 3. Save the product with the new stock count
        product.save()
        
        # 4. Save the sale itself
        super().save(*args, **kwargs)