# Use Python 3.7.9 as the base image
FROM python:3.9

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY ./requirements.txt .

# Install the Python dependencies from requirements.txt
RUN pip install -r requirements.txt

# Copy the FastAPI application file and all the model files into the container
COPY ./*.pkl ./
COPY ./ML_project.py .
COPY ./app.py .

# Copy the templates and static directory into the container
COPY ./templates ./templates
COPY ./static ./static



# Run the FastAPI application using Uvicorn
CMD ["sh", "-c", "uvicorn app:app --host=0.0.0.0 --port=${PORT:-5000}"]
