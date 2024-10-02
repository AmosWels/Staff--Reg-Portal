## Staff-Registration-Portal
Portal intended to support the new staff onboarding process

## Setup
```
git clone git@github.com:AmosWels/Staff-Registration-Portal.git
cd Staff-Registration-Portal
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
npm install

python manage.py migrate
python manage.py createsuperuser
nohup python manage.py runserver & npm start
```

## URLs
URL                       | Detail
------------------------- | ---------------------
127.0.0.1:8000/           | ReactJS index
127.0.0.1:8000/admin/     | Django admin
127.0.0.1:8000/api/users/ | Django Rest Framework


## Common Commands
```
python manage.py shell
from django.contrib.auth.models import User
user = User.objects.get(username='amoswels')
user = User.objects.create_superuser('admin', 'admin@example.com', 'admin')
user.save()
print(user.is_staff, user.is_superuser)
```

