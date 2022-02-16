from django.contrib.auth import login, logout

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from .serializers import *


class UserLoginView(APIView):
    """
	View for Login sytem without implemeting OTP System
	"""
    # throttle_classes = [AnonRateThrottle]

    def post(self, request, *args, **kwargs):
        """
		method for login with one device login system.
		makes activeuserinfo objects status true when logged in.
		"""

        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        response = Response({
            'token': token.key,
            'username': user.email,
            'is_active': user.is_active,
            'id': user.id
        }, status=status.HTTP_200_OK)
        response.set_cookie('auth_token', token, httponly=True, samesite='Lax')
        return response




class UserLogoutView(APIView):
    """
	View for Logout System for user
	"""
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        """
			makes activeuserinfo objects status false when logged out.
		"""

        logout(request)
        return Response({'detail': "Successfully logout"}, status=204)

