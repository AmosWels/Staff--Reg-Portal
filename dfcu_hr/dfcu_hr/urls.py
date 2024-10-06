from django.urls import path
from django.contrib import admin
from staff.views import (
    StaffRegistrationAPI,
    StaffRetrievalAPI,
    StaffUpdateAPI,
    api_metrics_view,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/staff/register/',
         StaffRegistrationAPI.as_view(),
         name='staff-register'),
    path('api/staff/retrieve/',
         StaffRetrievalAPI.as_view(),
         name='staff-retrieve'),
    path('api/staff/update/',
         StaffUpdateAPI.as_view(),
         name='staff-update'),
    path('api/api-metrics/',
        api_metrics_view,
        name='api-metrics'),
]
