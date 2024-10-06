import re
import re
import uuid
from datetime import datetime

class BaseAPI:
    def validate_unique_code(self, code):
        current_year = datetime.now().year
        pattern = rf'dfcu.*{current_year}'
        
        if re.search(pattern, code) and len(code) >= 10:
            return True
        else:
            return False
    
    def generate_employee_number(self):
        unique_id = uuid.uuid4().hex[:6].upper()  
        employee_number = f'dfcu{unique_id}'
        return employee_number