from django.urls import path
from .views import (
    AddFoodItemView, FoodItemListView, DeleteFoodItemView, EditFoodItemView,
    MenuView, AddOrderView, ChefDashboardView
)

urlpatterns = [
    path('add/', AddFoodItemView.as_view(), name='add-food-item'),
    path('list/', FoodItemListView.as_view(), name='list-food-items'),
    path('delete/<int:item_id>/', DeleteFoodItemView.as_view(), name='delete-food-item'),
    path('edit/<int:item_id>/', EditFoodItemView.as_view(), name='edit-food-item'),
    path('menu/', MenuView.as_view(), name='menu'),
    path('order/add/', AddOrderView.as_view(), name='add-order'),
    path('chef/dashboard/', ChefDashboardView.as_view(), name='chef-dashboard'),
]
