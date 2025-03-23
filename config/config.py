import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", os.urandom(24))
    
    # MySQL Database Configuration
    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")
    DB_PORT = int(os.getenv("DB_PORT", 3306))

    # Upload Folder Configuration
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "static/uploads")
    ALLOWED_EXTENSIONS = {"jpg", "jpeg"}
    MAX_FILE_SIZE = 3 * 1024 * 1024  # 3MB

    # Flask Session Configuration
    SESSION_PERMANENT = False
    SESSION_TYPE = os.getenv("SESSION_TYPE", "filesystem")

    # Admin Credentials
    ADMIN_ID = os.getenv("ADMIN_ID", "ADM/3030/22")
    ADMIN_NAME = os.getenv("ADMIN_NAME", "Principal")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "principal@gmail.com")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "principal")
    ADMIN_ROLE = os.getenv("ADMIN_ROLE", "Super Admin")
