from django.urls import path, include

from .views import  *


urlpatterns = [

	path('api-auth/', include('rest_framework.urls', namespace='rest_framework)')),

	path('login/', UserLoginView.as_view(), name='login'),
	path('logout/', UserLogoutView.as_view(), name='logout'),
]