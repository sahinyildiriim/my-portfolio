# My Portfolio

Full-stack personal portfolio project with a React + Vite frontend and a Spring Boot backend API.

## Overview

The frontend presents a one-page portfolio with sections such as Home, About, Projects, Skills, Blogs, and Contact. The backend provides the API used by the UI for projects, blog posts, and contact form submissions.

## Project Structure

```text
frontend/   React + Vite application
backend/    Spring Boot API
```

## Requirements

- Node.js 18+ for the frontend
- Java 21 for the backend
- PostgreSQL for the backend database

## Run Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

### Backend

Windows:

```bash
cd backend
mvnw.cmd spring-boot:run
```

macOS / Linux:

```bash
cd backend
./mvnw spring-boot:run
```

The API runs on `http://localhost:8081` by default.

## Frontend API Proxy

During local development, the frontend proxies `/api` requests to `http://localhost:8081`.

## API Endpoints

The UI uses these public endpoints:

- `GET /api/projects`
- `GET /api/projects/{slug}`
- `GET /api/blogs`
- `GET /api/blogs/{slug}`
- `POST /api/contact`

## Validation

Frontend checks:

```bash
cd frontend
npm run build
npm run lint
```

## Notes

- Backend configuration lives in `backend/src/main/resources/application.yml`.
- The frontend README and backend README contain folder-specific details if you need them.
