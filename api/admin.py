from django.contrib import admin
from .models import Category, Product, Sale

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    list_filter = ('category',)
    # Note: autocomplete_fields requires search_fields on the CategoryAdmin (which you have!)
    autocomplete_fields = ['category'] 

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # This removes the "Change" (pencil) and "View" (eye) buttons
        form.base_fields['category'].widget.can_change_related = False
        form.base_fields['category'].widget.can_view_related = False
        
        # Uncomment the line below if you want to remove the "+" button as well
        # form.base_fields['category'].widget.can_add_related = False
        
        return form

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'total_price', 'date_sold')
    readonly_fields = ('date_sold',)