# Conference Management System API

## Project Overview

A comprehensive REST API for managing conferences, built with Node.js and Express. This system allows users to organize and track conferences, including sessions, notes, and tasks.

### Features
- User registration and login with JWT authentication
- Full CRUD operations for conferences
- Session management within conferences
- Note-taking functionality
- Task management and tracking
- Interactive API documentation with Swagger UI

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger UI
- **Testing**: Jest + Supertest
- **Deployment**: Render
- **Containerization**: Docker

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone <repo-url>
cd <project-folder>
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
JWT_SECRET=my_jwt_secret_key
```

### Start the Server

```bash
npm run dev
```

### Access the API

Open  browser and navigate to:
```
http://localhost:3000/api-docs
```

## Docker Setup

### Build Docker Image

```bash
docker build -t conference-api .
```

### Run Container

```bash
docker run -p 3000:3000 conference-api
```

### Access API

```
http://localhost:3000/api-docs
```

## Testing

Run the automated test suite using Jest and Supertest:

```bash
npm test
```

The tests cover all API endpoints and ensure the application functions correctly.

## Deployment on Render

### Steps

1. **Push code to GitHub**

2. **Create a Web Service on Render**

3. **Configure Build Settings**
   - **Build Command**:
     ```bash
     npm install && npm rebuild sqlite3 --build-from-source
     ```
   - **Start Command**:
     ```bash
     npm start
     ```

4. **Add Environment Variables**
   - In the Render dashboard, add the following environment variables:
     ```env
     JWT_SECRET=my_jwt_secret_key
     ```

5. **Deploy**
   - Click "Create Web Service" to deploy

### Access API

Once deployed, access the API at:
```
https://web-service-2026.onrender.com
```

## CI/CD with GitHub Actions

The project includes automated CI/CD using GitHub Actions for seamless deployment to Render.

### Workflow File
- Location: `.github/workflows/deploy.yml`
- Trigger: Automatic on push to `main` branch

### Workflow Steps
1. Checkout code
2. Install dependencies
3. Run tests
4. Deploy using Render Deploy Hook

### Setup GitHub Secret

Add the following secret to the GitHub repository:

```bash
RENDER_DEPLOY_HOOK=<https://web-service-2026.onrender.com>
```

## API Documentation

The API documentation is available via Swagger UI at `/api-docs` endpoint.

### Example API Requests

#### Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "Hadil",
  "email": "Hadil@example.com",
  "password": "securepassword"
}
```

#### Login User
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "Hadil@example.com",
  "password": "securepassword"
}
```

#### Create Conference
```bash
POST /api/conferences
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "startDate": "2024-06-15",
  "endDate": "2024-06-17",
  "location": "San Francisco, CA"
}
```

#### Add Session
```bash
POST /api/sessions
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "conferenceId": 1,
  "title": "Opening Keynote",
  "description": "Welcome and overview",
  "startTime": "2024-06-15T09:00:00Z",
  "endTime": "2024-06-15T10:00:00Z",
  "speaker": "John Smith"
}
```

#### Add Note
```bash
POST /api/notes
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "sessionId": 1,
  "content": "Key takeaways from the keynote...",
  "userId": 1
}
```

#### Add Task
```bash
POST /api/tasks
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Prepare presentation slides",
  "description": "Create slides for the upcoming session",
  "dueDate": "2024-06-10",
  "status": "pending",
  "userId": 1,
  "conferenceId": 1
}
```

For complete API documentation including all endpoints, request/response formats, and authentication requirements, visit the Swagger UI at `/api-docs`.
