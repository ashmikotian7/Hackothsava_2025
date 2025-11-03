from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Employee, Chef


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'email', 'phone_number', 'staff_id', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        """Ensure email ends with @karmic.com"""
        if not value.lower().endswith('@karmic.com'):
            raise serializers.ValidationError("Email must be a @karmic.com address")
        return value

    def validate_staff_id(self, value):
        """Ensure Employee ID starts with EMP"""
        if not value.upper().startswith('EMP'):
            raise serializers.ValidationError("Employee ID must start with 'EMP' (e.g., EMP001)")
        return value.upper()

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Employee.objects.create(**validated_data)


class ChefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chef
        fields = ['id', 'name', 'email', 'phone_number', 'staff_id', 'password', 'secret_key']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        """Ensure email ends with @karmic.com"""
        if not value.lower().endswith('@karmic.com'):
            raise serializers.ValidationError("Email must be a @karmic.com address")
        return value

    def validate_staff_id(self, value):
        """Ensure Chef ID starts with CHEF"""
        if not value.upper().startswith('CHEF'):
            raise serializers.ValidationError("Chef ID must start with 'CHEF' (e.g., CHEF001)")
        return value.upper()

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Chef.objects.create(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        from .models import Employee, Chef

        user = None
        role = None

        # Check Employee table
        try:
            user = Employee.objects.get(email=email, password=password)
            role = "employee"
        except Employee.DoesNotExist:
            pass

        # If not employee, check Chef table
        if not user:
            try:
                user = Chef.objects.get(email=email, password=password)
                role = "chef"
            except Chef.DoesNotExist:
                pass

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        return {"id": user.id, "role": role}
