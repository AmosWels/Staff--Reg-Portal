from django.db import models

class Staff(models.Model):
    surname = models.CharField(max_length=100)
    other_names = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    id_photo = models.TextField(blank=True, null=True)  # Store Base64-encoded image
    unique_code = models.CharField(max_length=10, unique=True)
    employee_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.surname
