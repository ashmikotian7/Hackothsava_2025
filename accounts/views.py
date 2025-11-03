from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from .models import Employee, Chef
from .serializers import EmployeeSerializer, ChefSerializer


class EmployeeSignupView(APIView):
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChefSignupView(APIView):
    def post(self, request):
        serializer = ChefSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Chef created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import Employee, Chef


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check Employee table
        try:
            employee = Employee.objects.get(email=email)
            if check_password(password, employee.password):
                return Response(
                    {
                        "message": "Login successful",
                        "role": "employee",
                        "staff_id": employee.staff_id
                    },
                    status=status.HTTP_200_OK
                )
        except Employee.DoesNotExist:
            pass

        # Check Chef table
        try:
            chef = Chef.objects.get(email=email)
            if check_password(password, chef.password):
                return Response(
                    {
                        "message": "Login successful",
                        "role": "chef",
                        "staff_id": chef.staff_id
                    },
                    status=status.HTTP_200_OK
                )
        except Chef.DoesNotExist:
            pass

        # If neither matches
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )
