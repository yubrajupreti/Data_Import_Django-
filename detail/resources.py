from import_export import resources
from .models import EmployeeDetail

class EmployeeResource(resources.ModelResource):
    class Meta:
        model = EmployeeDetail
        fields=['full_name','salary']