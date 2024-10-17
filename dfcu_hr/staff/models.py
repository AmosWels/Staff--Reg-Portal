from django.db import models

class Staff(models.Model):
    surname = models.CharField(max_length=100)
    other_names = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    id_photo = models.TextField(blank=True, null=True)  # Store Base64-encoded image
    id_photo_link = models.URLField(blank=True, null=True)
    unique_code = models.CharField(max_length=10, unique=True)
    employee_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.surname


class APIMetrics(models.Model):
    total_requests = models.PositiveIntegerField(default=0)
    successful_requests = models.PositiveIntegerField(default=0)
    failed_requests = models.PositiveIntegerField(default=0)

    @classmethod
    def increment_total_requests(cls):
        metrics, created = cls.objects.get_or_create(id=1)
        metrics.total_requests += 1
        metrics.save()

    @classmethod
    def increment_successful_requests(cls):
        metrics, created = cls.objects.get_or_create(id=1)
        metrics.successful_requests += 1
        metrics.save()

    @classmethod
    def increment_failed_requests(cls):
        metrics, created = cls.objects.get_or_create(id=1)
        metrics.failed_requests += 1
        metrics.save()
