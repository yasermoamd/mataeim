FROM python:3.9-slim
LABEL authors="yasermoamd"

WORKDIR /

COPY requirements.txt /
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and npm for Tailwind CSS
RUN apt-get update && apt-get install -y nodejs npm

# Copy package.json first to leverage layer caching for npm installs
COPY package.json /
RUN npm install

# Copy the remaining project files
COPY . .

# Build Tailwind CSS
RUN npm run build-css

ENV FLASK_APP=app.py
CMD gunicorn --bind 0.0.0.0:5000 app:app
