# Backend

Spring Boot API for the portfolio.

## Run Locally

Set the required environment variables first:

- `DB_PASSWORD` for the PostgreSQL password
- `JWT_SECRET` for the base64-encoded JWT signing secret

```bash
cd backend
mvnw.cmd spring-boot:run
```

On macOS or Linux, use `./mvnw spring-boot:run` instead.

The API runs on `http://localhost:8081` by default.

## Stack

- Java 21
- Spring Boot
- PostgreSQL
- Flyway
- Spring Security
- JWT

## Public API

- `GET /api/projects`
- `GET /api/projects/{slug}`
- `GET /api/blogs`
- `GET /api/blogs/{slug}`
- `POST /api/contact`

## Notes

- Main configuration lives in `src/main/resources/application.yml`.
- Database migrations live in `src/main/resources/db/migration`.
