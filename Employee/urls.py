"""Employee URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from django.views.generic import TemplateView

def get_redirect_url(request, *args, **kwargs):
     return render(request,'index.html')


urlpatterns = [
    path('admin/', admin.site.urls),

    #project app url
    path('api/', include('user.urls')),
    path('api/', include('detail.urls')),
    path('', TemplateView.as_view(template_name='index.html')),

]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns.append(url(r'^.*$', get_redirect_url))