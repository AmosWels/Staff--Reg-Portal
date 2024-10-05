from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings

from react.views import serve_react

urlpatterns = [
    path('admin/', admin.site.urls),
    # re_path(r"^(?P<path>.*)$", serve_react,
    #         {"document_root": settings.REACT_APP_BUILD_PATH}),
]