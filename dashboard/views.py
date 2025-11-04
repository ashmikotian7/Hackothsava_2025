from datetime import datetime, timedelta
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import FoodItem, Order, OrderItem
from .serializers import FoodItemSerializer, OrderSerializer


# ✅ ADD FOOD ITEM
class AddFoodItemView(APIView):
    def post(self, request):
        serializer = FoodItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Food item added successfully!", "data": serializer.data}, status=201)
        return Response(serializer.errors, status=400)


# ✅ LIST ALL FOOD ITEMS
class FoodItemListView(APIView):
    def get(self, request):
        items = FoodItem.objects.all()
        serializer = FoodItemSerializer(items, many=True)
        return Response(serializer.data)


# ✅ DELETE FOOD ITEM
class DeleteFoodItemView(APIView):
    def delete(self, request, item_id):
        try:
            item = FoodItem.objects.get(id=item_id)
            item.delete()
            return Response({"message": "Food item deleted successfully"}, status=200)
        except FoodItem.DoesNotExist:
            return Response({"error": "Food item not found"}, status=404)


# ✅ EDIT FOOD ITEM
class EditFoodItemView(APIView):
    def put(self, request, item_id):
        try:
            item = FoodItem.objects.get(id=item_id)
        except FoodItem.DoesNotExist:
            return Response({"error": "Food item not found"}, status=404)

        serializer = FoodItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Food item updated successfully", "data": serializer.data}, status=200)
        return Response(serializer.errors, status=400)


# ✅ MENU VIEW (today + tomorrow)
class MenuView(APIView):
    def get(self, request):
        today = datetime.now().strftime('%A')
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%A')

        today_menu = FoodItem.objects.filter(day__iexact=today)
        tomorrow_menu = FoodItem.objects.filter(day__iexact=tomorrow)

        return Response({
            "today": today,
            "tomorrow": tomorrow,
            "today_menu": FoodItemSerializer(today_menu, many=True).data,
            "tomorrow_menu": FoodItemSerializer(tomorrow_menu, many=True).data
        })


# ✅ ADD ORDER
class AddOrderView(APIView):
    def post(self, request):
        """
        Example JSON:
        {
          "employee_name": "John",
          "day": "Tuesday",
          "items": [
            {"food_item": 1, "quantity": 2},
            {"food_item": 3, "quantity": 1}
          ]
        }
        """
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Order placed successfully"}, status=201)
        return Response(serializer.errors, status=400)


# ✅ CHEF DASHBOARD - TOTAL QUANTITY PER FOOD ITEM
class ChefDashboardView(APIView):
    def get(self, request):
        food_counts = []
        for food in FoodItem.objects.all():
            total_quantity = OrderItem.objects.filter(food_item=food).aggregate(models.Sum('quantity'))['quantity__sum'] or 0
            food_counts.append({
                "food_item": food.name,
                "day": food.day,
                "session": food.session,
                "total_ordered": total_quantity
            })
        return Response(food_counts)
