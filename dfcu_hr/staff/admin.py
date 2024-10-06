from django.contrib import admin
from .models import Staff

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('surname', 'other_names', 'employee_number')  # Customize this as needed
    search_fields = ('surname', 'other_names', 'employee_number')  # Customize this as needed

# Alternatively, you can use the following simpler syntax:
# admin.site.register(Staff, StaffAdmin)
