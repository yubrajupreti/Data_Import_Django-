from datetime import datetime

from rest_framework import serializers

from .models import *

class EmployeeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=EmployeeDetail
        fields=['created_by','created_date','full_name','salary','gender','designation','dob']
        extra_kwargs = {
            'created_by':{'read_only':True}
        }

    # def validate_dob(self,dob):
    #     import pdb;pdb.set_trace()
    #     try:
    #         datetime_object = datetime.strptime(dob, '%Y/%m/%d')
    #         return datetime_object
    #     except :
    #         raise serializers.ValidationError({'detail':'datetime'})


class FileUploadSerializer(serializers.Serializer):
    file=serializers.FileField()
    class Meta:
        fields=['file',]

    def validate_file(self, file):
        if file:
            if not file.name.endswith(('.csv', '.xlsx')):
                raise serializers.ValidationError("Only csv and excel file are accepted")

            return file