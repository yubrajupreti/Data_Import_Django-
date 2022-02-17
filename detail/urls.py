from django.urls import path, include
from rest_framework import routers

from .views import  *

router=routers.DefaultRouter()
router.register('employee', EmployeeDetailView, basename='employee')


urlpatterns = [

	path('',include(router.urls)),
	path('import/', ImportDetailView.as_view(), name='import'),
]