from rest_framework import serializers
from .models import Staff

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['surname', 'other_names', 'date_of_birth',
                  'id_photo', 'unique_code', 'employee_number']
