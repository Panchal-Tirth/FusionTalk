# Social Media Platform

**A full-stack social media application developed using Django and Django Rest Framework for the backend and React for the frontend. The platform allows users to create posts, comment, like posts, and interact in real-time through chat.**

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Authentication**: Secure login and registration using Google OAuth and JWT for session management.
- **Post Creation**: Users can create, edit, and delete posts.
- **Comments and Likes**: Users can comment on and like posts.
- **Real-Time Chat**: Chat feature for real-time communication (in progress).
- **Responsive Design**: Intuitive and mobile-friendly user interface.

---

## Installation

### Prerequisites
- Python 3.x
- Node.js and npm
- Git
- Virtual Environment (optional but recommended)

### Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/social-media-platform.git
    cd social-media-platform
    ```

2. **Set up the backend:**
   - Navigate to the backend directory (if applicable).
   - Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up environment variables:**  
    - Create a `.env` file in the backend directory and add your environment variables, such as:
    ```bash
    SECRET_KEY=your_secret_key
    DEBUG=True
    DATABASE_URL=your_database_url (if using PostgreSQL, MySQL, etc.)
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    JWT_SECRET_KEY=your_jwt_secret_key
    ```

5. **Apply migrations:**
    ```bash
    python manage.py migrate
    ```

6. **Run the development server:**
    ```bash
    python manage.py runserver
    ```

7. **Set up the frontend:**
   - Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

8. **Install Node.js dependencies:**
    ```bash
    npm install
    ```

9. **Start the React development server:**
    ```bash
    npm start
    ```

---

## Technologies Used
- **Backend**: Django, Django Rest Framework (DRF)
- **Frontend**: React
- **Database**: SQLite (or specify if using PostgreSQL, MySQL, etc.)
- **Authentication**: Google OAuth, JWT
- **Deployment**: (Optional - specify if deployed to Heroku, AWS, etc.)

---

## Environment Variables

In your `.env` file, add the following variables:

```bash
SECRET_KEY=your_django_secret_key
DEBUG=True
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET_KEY=your_jwt_secret_key
