from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class EmployeeDetail(models.Model):

    GENDER=(
        ('male','male'),
        ('female','female'),
        ('other','other')
    )

    created_by=models.ForeignKey(User,on_delete=models.CASCADE, blank=True)
    created_date=models.DateField(auto_now_add=True)
    full_name=models.CharField(max_length=55)
    dob=models.DateField()
    gender=models.CharField(max_length=55,choices=GENDER)
    salary=models.DecimalField(max_digits=8, decimal_places=2)
    designation=models.CharField(max_length=255)