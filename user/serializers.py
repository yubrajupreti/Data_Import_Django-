from django.contrib.auth import authenticate

from rest_framework import serializers


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            # import pdb;pdb.set_trace()
            user = authenticate(username=username, password=password)

            if user:
                if user.is_active:
                    data["user"] = user

            else:
                msg = "The username and password is not registered"
                raise serializers.ValidationError(msg)
        else:
            msg = "Please provide username and password"
            raise serializers.ValidationError(msg)

        return data
