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

#### GitHub Actions Deployment to Render

The project includes a GitHub Actions workflow for automatic deployment to Render on pushes to the main branch.

**Setup GitHub Secrets:**
- Go to your GitHub repository settings
- Navigate to Secrets and variables > Actions
- Add a new repository secret named `RENDER_DEPLOY_HOOK`
- Set the value to your Render deploy hook URL (found in your Render service settings under "Deploy Hook")

**Triggering Deployment:**
- Push changes to the `main` branch
- The workflow will automatically run tests and trigger a deployment to Render

### Local Deployment

1. Clone the repository.
2. Copy `.env.example` to `.env` and configure your environment variables.
3. Install dependencies: `npm install`
4. Run the application: `npm start`
5. Access the API at `http://localhost:3000`

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 3000)