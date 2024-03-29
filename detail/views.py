import json
import os

import pandas as pd
import xlwt
from django.http import HttpResponse, HttpResponseNotFound
from django.views import View
from django_filters.rest_framework import DjangoFilterBackend

from .resources import EmployeeDetail


from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .base import temporary_file
from .serializers import *


class EmployeeDetailView(viewsets.ModelViewSet):
    queryset = EmployeeDetail.objects.all()
    serializer_class = EmployeeDetailSerializer
    permission_classes = (IsAuthenticated,)

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['created_by__username','created_date']
    search_fields = ['id','created_by__username','created_date','full_name']
    ordering_fields = ['id','created_by__username','created_date','full_name','salary']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



class ImportDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def validator(self,json_data):
        """
        validate the excel and csv file data

        :param json_data as list of dictionary:
        :return null rows, dictionary list and datetime dob field:
        """

        if json_data:
            null_rows = []
            json_key = ('Full Name', 'Date of Birth', 'Gender', 'Salary', 'Designation')

            for key in json_data[0].keys():

                if key not in json_key:
                    msg = f'{key} is not valid keyword. The valid keyword are {json_key}'
                    raise ValidationError(
                        {'detail': msg}
                    )

            for index, single_obj in enumerate(json_data):
                row = index + 2

                if all(single_obj[key] is None for key in single_obj.keys()):
                    null_rows.append(row)
                    json_data.pop(index)
                    break

                for key in single_obj.keys():

                    if single_obj[key] is None:
                        raise ValidationError(
                            {'detail': f'{key} field cannot be null in row {row}'}
                        )

                    elif key == 'Date of Birth':

                        try:
                            dob = datetime.strptime(single_obj['Date of Birth'], '%Y/%m/%d').date()

                        except:
                            raise ValidationError(
                                {'detail': f'Invalid date format in row {row} '}
                            )

                    elif key == 'Salary':

                        if bool(isinstance(single_obj['Salary'], int) or isinstance(single_obj['Salary'],float)) == False:
                            raise ValidationError(
                                {'detail': f'Invalid Salary. Salary field should be decimal in row {row}'}
                            )

                    elif key == 'Gender':

                        if single_obj[key] not in ('male', 'Male', 'Female', 'female', 'Other', 'other'):
                            raise ValidationError(
                                {'detail': f'Invalid gender data in row {row}. Choices are male, female or other.'}
                            )

            return null_rows,dob,json_data

        else:
            raise ValidationError({'detail':'No data found'})


    def create_obj(self,request,json_data):
        """
        Create EmployeeDetail instances of excel or csv file data

        :param request: user relation
        :param json_data: dictionary list
        :return: null rows
        """

        null_rows, dob, checked_data = self.validator(json_data)

        for validated_obj_data in checked_data:
            gender=validated_obj_data['Gender'].lower()
            data = {
                'full_name': validated_obj_data['Full Name'],
                'dob': dob,
                'salary': validated_obj_data['Salary'],
                'designation': validated_obj_data['Designation'],
                'gender':gender ,
            }

            employee_serializer = EmployeeDetailSerializer(data=data)
            employee_serializer.is_valid(raise_exception=True)
            employee_serializer.save(created_by=request.user)

        return null_rows



    def post(self,request,*args,**kwargs):
        """
        Accept excel or csv for post request

        :param request:
        :param args: csv or excel file
        :param kwargs:
        :return: response message
        """
        serializer=FileUploadSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):


            file=request.data['file']

            if file.name.endswith('.xlsx'):
                full_path=temporary_file(file)
                excel_data_fragment = pd.read_excel(full_path, engine='openpyxl')
                json_str = excel_data_fragment.to_json(orient='records')

            elif file.name.endswith('.csv'):
                full_path=temporary_file(file)
                csv_data_fragment = pd.read_csv(full_path)
                json_str = csv_data_fragment.to_json(orient='records')

            json_data = json.loads(json_str)
            null_rows=self.create_obj(request,json_data)

            if len(null_rows) > 0:
                return Response(
                    {'detail': 'Success', 'warning': f'Row {null_rows} were skipped since they did not have data'})

            else:
                return Response({'detail': 'Success'})




class ExcelDownloadView(APIView):

    def post(self,request,*args,**kwargs):
        ids=request.data['id']
        result = EmployeeDetail.objects.filter(id__in=ids)
        serializers=EmployeeExportSerializer(result, many=True)

        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="users.xls"'

        wb = xlwt.Workbook(encoding='utf-8')
        ws = wb.add_sheet('Users')

        # Sheet header, first row
        row_num = 0

        font_style = xlwt.XFStyle()
        font_style.font.bold = True

        columns = ['Name', 'Date of Birth ', 'Gender', 'Salary','Designation']

        for col_num in range(len(columns)):
            ws.write(row_num, col_num, columns[col_num], font_style)

        # Sheet body, remaining rows
        font_style = xlwt.XFStyle()

        rows = serializers.data
        data_key = ['full_name', 'dob', 'gender', 'salary','designation']
        for row in rows:
            row_num += 1
            # import pdb;pdb.set_trace()
            for col_num in range(len(row)):
                ws.write(row_num, col_num, row[data_key[col_num]], font_style)

        wb.save(response)
        return response

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()
