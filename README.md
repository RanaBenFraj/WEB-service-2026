# Conference Management System API

A REST API for managing conferences, built with Node.js, Express, and SQLite.

## Features

- User registration and authentication with JWT
- Conference CRUD operations
- Session management
- Note taking
- Task management
- Swagger API documentation

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run the application: `npm run dev`

## API Documentation

Access the Swagger UI at `http://localhost:3000/api-docs`

## Testing

Run the automated tests using Jest and Supertest:

```bash
npm test
```

## Docker

### Build and run the container locally

```bash
docker build -t conference-api .
docker run -p 3000:3000 conference-api
```

### Using docker-compose

```bash
docker-compose up
```

## Deployment

### Render Deployment

1. Connect your GitHub repository to Render.
2. Create a new Web Service.
3. Set the following commands:
   - **Build Command**: `npm install && npm rebuild sqlite3 --build-from-source`
   - **Start Command**: `npm start`
4. Add environment variables in the Render dashboard:
   - `PORT`: 10000 (or Render's default)
   - `JWT_SECRET`: Your secret key for JWT tokens
5. Deploy the service.

### Local Deployment

1. Clone the repository.
2. Copy `.env.example` to `.env` and configure your environment variables.
3. Install dependencies: `npm install`
4. Run the application: `npm start`
5. Access the API at `http://localhost:3000`

### GitHub Actions (Docker Hub)

The project includes a GitHub Actions workflow for automatic deployment to Docker Hub on pushes to the main branch. Configure the following secrets in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 3000)