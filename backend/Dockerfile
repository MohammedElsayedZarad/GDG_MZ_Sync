# Use an official lightweight Python image.
# 3.10-slim is a good balance between size and compatibility.
FROM python:3.10-slim

# Prevent Python from writing pyc files to disc and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies (if any are needed for your specific packages)
# For example, if you need gcc for building some python wheels:
# RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

# Copy requirements file first to leverage Docker cache
COPY requirements.txt .

# Install python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8001

# Command to run the application
# Using 0.0.0.0 is crucial for Docker networking
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
