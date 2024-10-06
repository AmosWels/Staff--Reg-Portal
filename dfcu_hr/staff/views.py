from rest_framework.decorators import api_view
from rest_framework import status, generics
from rest_framework.response import Response
from django.db.models import Q
from .serializers import StaffSerializer
from .models import (
    Staff,
    APIMetrics
)
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

    def post(self, request, *args, **kwargs):
        unique_code = request.data.get('unique_code', None)
        if not unique_code:
            return Response(
                {"error": "Missing unique code in request"},
                status=status.HTTP_400_BAD_REQUEST)
        if not self.validate_unique_code(request.data.get('unique_code')):
            return Response(
                {"error": "Invalid unique code, request for new code"},
                status=status.HTTP_400_BAD_REQUEST)
        
        employee_number = request.data.get('employee_number', None)
        if employee_number:
            staff = Staff.objects.filter(employee_number=employee_number,
                        unique_code=unique_code)
            if not staff.exists():
                return Response(
                    {"error": f"Staff with employee number '{employee_number}' "
                              f" and unique code '{unique_code}' not found"},
                    status=status.HTTP_404_NOT_FOUND)
            serializer = self.get_serializer(staff.last())
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


@api_view(['POST'])
def api_metrics_view(request):
    unique_code = request.data.get('unique_code')
    
    if not unique_code:
        return Response(
            {"error": "unique code is required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        staff = Staff.objects.get(unique_code=unique_code)
    except Staff.DoesNotExist:
        return Response(
            {"error": "Staff with the provided unique code does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    allowed_unique_codes = ['dfcu2024ex', 'dfcu2024lx', 'dfcu2024hp',
                            'dfcu2024op', 'dfcu2024mn', 'dfcu2024ab']
    if unique_code not in allowed_unique_codes:
        return Response(
            {"error": "Not verified to view metrics"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    metrics = APIMetrics.objects.first()
    if metrics:
        total_value = 0
        total = int(metrics.successful_requests) + int(metrics.failed_requests)

        if total == int(metrics.total_requests):
            total_value = int(metrics.total_requests)
        else:
            total_value = total
        data = {
            'total_requests': total_value,
            'successful_requests': metrics.successful_requests,
            'failed_requests': metrics.failed_requests,
        }
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Metrics not found"}, status=status.HTTP_404_NOT_FOUND)
