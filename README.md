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

The project includes a GitHub Actions workflow for automatic deployment to Docker Hub on pushes to the main branch. Configure the following secrets in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 3000)