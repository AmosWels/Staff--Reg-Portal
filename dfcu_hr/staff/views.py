from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.response import Response
from django.db.models import Q
from .serializers import StaffSerializer
from .models import Staff
from .utils import BaseAPI

class StaffRegistrationAPI(BaseAPI, generics.CreateAPIView):
    serializer_class = StaffSerializer

    def create(self, request, *args, **kwargs):
        required_keys = ['unique_code', 'surname',
                         'other_names', 'id_photo', 'date_of_birth']
        
        missing_keys = [key for key in required_keys if key not in request.data]

        if missing_keys:
            return Response(
                {"error": f"Missing keys in request: {', '.join(missing_keys)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not self.validate_unique_code(request.data.get('unique_code')):
            return Response(
                {"error": "Invalid unique code, request for new code"},
                status=status.HTTP_400_BAD_REQUEST)
        employee_number = self.generate_employee_number()
        request.data['employee_number'] = employee_number
        return super().create(request, *args, **kwargs)

class StaffRetrievalAPI(BaseAPI, generics.ListAPIView):
    serializer_class = StaffSerializer
    queryset = Staff.objects.all()

    def get(self, request, *args, **kwargs):
        if 'unique_code' not in request.data:
            return Response(
                {"error": "Missing unique code in request"},
                status=status.HTTP_400_BAD_REQUEST)
        if not self.validate_unique_code(request.data.get('unique_code')):
            return Response(
                {"error": "Invalid unique code, request for new code"},
                status=status.HTTP_400_BAD_REQUEST)
        
        employee_number = request.data.get('employee_number', None)
        if employee_number:
            staff = get_object_or_404(Staff, employee_number=employee_number)
            serializer = self.get_serializer(staff)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return super().get(request, *args, **kwargs)

class StaffUpdateAPI(BaseAPI, generics.UpdateAPIView):
    serializer_class = StaffSerializer
    queryset = Staff.objects.all()

    def update(self, request, *args, **kwargs):
        required_keys = ['unique_code', 'employee_number']
        
        missing_keys = [key for key in required_keys if key not in request.data]

        if missing_keys:
            msg = f"Missing keys in request: {', '.join(missing_keys)}"
            return Response(
                {"error": msg},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not self.validate_unique_code(request.data.get('unique_code')):
            return Response(
                {"error": "Invalid unique code, request for new code"},
                status=status.HTTP_400_BAD_REQUEST)

        unique_code = request.data.get('unique_code')
        employee_number = request.data.get('employee_number')
        if not Staff.objects.filter(unique_code=unique_code).exists():
            return Response(
                {"error": "No staff found with the provided unique code"},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            staff = Staff.objects.get(
                employee_number=employee_number, unique_code=unique_code)
        except Staff.DoesNotExist:
            error = ("Employee number and unique code do not "
                     "match any staff record")
            return Response(
                {"error": error},
                status=status.HTTP_400_BAD_REQUEST
            )

        update_data = {
            'date_of_birth': request.data.get('date_of_birth', None),
            'id_photo': request.data.get('id_photo', None),
            'surname': request.data.get('surname', None),
            'other_names': request.data.get('other_names', None)
        }

        update_data = {k: v for k, v in update_data.items() if v is not None}

        Staff.objects.filter(
            Q(employee_number=employee_number) & 
            Q(unique_code=unique_code)).update(**update_data)
        staff = Staff.objects.get(
            employee_number=employee_number, unique_code=unique_code)
        return Response(
            self.get_serializer(staff).data, status=status.HTTP_200_OK)
