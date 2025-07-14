# Spring Boot + React Application

This is a full-stack application with a Spring Boot backend and React frontend.

## Features

- User authentication (signup/login) with JWT tokens
- PostgreSQL database integration
- WebSocket support
- Modern UI with Tailwind CSS

## Running in GitHub Codespaces

### Prerequisites

1. Make sure you have the following ports forwarded in your Codespace:
   - Port 8080 (Backend)
   - Port 3000 (Frontend)
   - Port 5432 (PostgreSQL - if using external database)

### Backend Setup

1. **Start the Spring Boot application:**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   The backend will start on port 8080.

2. **Database Configuration:**
   - The application is configured to use PostgreSQL
   - Update `src/main/resources/application.properties` if you need to change database settings
   - For local development, you can use a local PostgreSQL instance or a cloud database

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The frontend will start on port 3000.

### Accessing the Application

1. **Frontend:** Open the forwarded port 3000 in your browser
2. **Backend API:** The API is available at the forwarded port 8080

### Troubleshooting

#### Sign-in Issues
- Make sure both frontend and backend are running
- Check that the proxy configuration in `frontend/package.json` points to `http://localhost:8080`
- Verify that CORS is properly configured in the backend
- Check browser console for any network errors

#### Database Issues
- Ensure PostgreSQL is running and accessible
- Verify database credentials in `application.properties`
- Check that the database exists and is accessible

#### Port Issues
- Make sure ports 3000 and 8080 are properly forwarded in your Codespace
- Check that no other services are using these ports

## Development

### Backend Structure
- `src/main/java/com/fernando/restapi/` - Main application code
- `src/main/java/com/fernando/restapi/controller/` - REST controllers
- `src/main/java/com/fernando/restapi/model/` - Entity models
- `src/main/java/com/fernando/restapi/security/` - JWT authentication

### Frontend Structure
- `frontend/src/components/` - React components
- `frontend/src/utils/` - Utility functions including auth helpers

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/hello` - Test endpoint

## Technologies Used

- **Backend:** Spring Boot, Spring Security, JWT, PostgreSQL
- **Frontend:** React, Tailwind CSS
- **Build Tools:** Maven, npm
