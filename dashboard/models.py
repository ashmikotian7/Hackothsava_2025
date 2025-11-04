from django.db import models

# Food items created by chef
class FoodItem(models.Model):
    SESSION_CHOICES = [
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('evening', 'Evening'),
    ]
    name = models.CharField(max_length=100)
    session = models.CharField(max_length=20, choices=SESSION_CHOICES)
    day = models.CharField(max_length=20)  # e.g. Monday / Tuesday
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.day} - {self.session})"


# Each employee can add food selections
class Order(models.Model):
    employee_name = models.CharField(max_length=100)  # simple name field instead of auth
    created_at = models.DateTimeField(auto_now_add=True)
    day = models.CharField(max_length=20)  # for which day this order is made

    def __str__(self):
        return f"Order {self.id} by {self.employee_name} ({self.day})"


# Each item in the order (with quantity)
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.food_item.name} x{self.quantity}"
