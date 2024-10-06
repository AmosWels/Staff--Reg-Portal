## Staff-Registration-Portal

This portal is intended to support the new staff onboarding process using Django for the backend and React for the frontend.

### API Documentation
- [Link to API Documentation](https://documenter.getpostman.com/view/3765155/2sAXxMgDkF)
- Copy and Paste in browser [https://documenter.getpostman.com/view/3765155/2sAXxMgDkF](https://documenter.getpostman.com/view/3765155/2sAXxMgDkF)

### Prerequisites

- Python 3.x
- Node.js and npm
- Virtualenv (optional but recommended)

### Backend Setup (Django)

1. **Clone the repository:**
    ```sh
    git clone git@github.com:AmosWels/Staff-Registration-Portal.git
    cd Staff-Registration-Portal
    ```

2. **Create and activate a virtual environment (optional but recommended):**
    ```sh
    cd dfcu_hr
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install backend dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

4. **Apply migrations:**
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

5. **Create a superuser (for accessing the Django admin interface):**
    ```sh
    python manage.py createsuperuser
    ```

6. **Run the Django development server:**
    ```sh
    python manage.py runserver
    ```

### Frontend Setup (React)

1. **Navigate to the frontend directory:**
    ```sh
    cd dfcu-frontend
    ```

2. **Install frontend dependencies:**
    ```sh
    npm install
    ```

3. **Start the React development server:**
    ```sh
    npm start
    ```

### Running the Project

- **Backend:** The Backend server will be running at **`http://127.0.0.1:8000/`**
- **Frontend:** The React development server will be running at **`http://localhost:3000/`** or **`http://localhost:3001/`** depending on the available port. 


### Building the Frontend for Production

1. **Build the React app:**
    ```sh
    npm run build
    ```

### Additional Commands

- **Deactivate the virtual environment:**
    ```sh
    deactivate
    ```
- **To view admin, create a user with unique id as one of the following:**
    ```
    - dfcu2024ex 
    - dfcu2024lx
    ```

