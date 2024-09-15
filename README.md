# MSMA - Movie and Series Management Application

A comprehensive application for managing movies and series, with features like authentication, file uploads, and API integrations.

## Features
- **Authentication**: Secure login and registration system.
- **File Upload**: Supports media uploads for movies and series.
- **API Integration**: RESTful API to interact with the system programmatically.

## How to Run

### Docker
1. Build the Docker image:
    ```bash
    docker build -t msma .
    ```
2. Run the Docker container:
    ```bash
    docker run -p 3000:7800 -d msma
    ```
   The application will be available on `http://localhost:3000`.

### Node.js
1. Install dependencies (if not already installed):
    ```bash
    npm install
    ```
2. Run the application:
    ```bash
    node app
    ```
   The application will be running on port `7800`.

### Default Port
- **Port**: 7800 (can be mapped to port 3000 in Docker).

## API Documentation
- Documentation for the API is available at `/api/docs`.

