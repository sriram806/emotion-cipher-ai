# Use official Python runtime as a parent image tailored for ML
FROM python:3.11-slim

# Set working directory to /app
WORKDIR /app

# Copy requirement files first to leverage Docker cache
COPY requirements.txt .

# Install dependencies (ignoring warnings for cleanly built containers)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files including the models
COPY . .

# Expose the API port
EXPOSE 8000

# Start the FastAPI application via uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
