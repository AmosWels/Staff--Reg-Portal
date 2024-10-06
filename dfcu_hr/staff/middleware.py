# staff/middleware.py
from django.utils.deprecation import MiddlewareMixin
from .models import APIMetrics

class APIMetricsMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Increment total requests
        APIMetrics.increment_total_requests()

    def process_response(self, request, response):
        if response.status_code >= 200 and response.status_code < 400:
            # Increment successful requests
            APIMetrics.increment_successful_requests()
        else:
            # Increment failed requests
            APIMetrics.increment_failed_requests()
        return response
