<<<<<<< HEAD
from django.urls import path
from .views import EmployeeSignupView, ChefSignupView
from .views import LoginAPIView

urlpatterns = [
    path('signup/employee/', EmployeeSignupView.as_view(), name='employee-signup'),
    path('signup/chef/', ChefSignupView.as_view(), name='chef-signup'),
    path('login/', LoginAPIView.as_view(), name='login'),

]
=======
from django.urls import path
from .views import EmployeeSignupView, ChefSignupView
from .views import LoginAPIView

urlpatterns = [
    path('signup/employee/', EmployeeSignupView.as_view(), name='employee-signup'),
    path('signup/chef/', ChefSignupView.as_view(), name='chef-signup'),
    path('login/', LoginAPIView.as_view(), name='login'),

]
>>>>>>> 8f7b57c6809e0ef64e84c82e0a9581df1c6d299a
