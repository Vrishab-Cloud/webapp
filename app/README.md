# Cloud Application Backend

This is the core backend service for the cloud application, providing user management and API endpoints.

## Project Structure

- `app.js` - Main Express application setup
- `index.js` - Application entry point
- `config/` - Configuration files
- `controllers/` - Business logic
- `models/` - Database models
- `routes/` - API routes
- `utils/` - Utility functions
- `tests/` - API tests

## Setup Instructions

### 1. Install Dependencies

```bash
npm ci  # Installs all dependencies from package-lock.json
```

Or install manually:
```bash
npm i express dotenv body-parser
npm i bcrypt joi uuid 
npm i sequelize mysql2
npm i @google-cloud/pubsub google-auth-library winston
npm i -D jest supertest nodemon sequelize-cli
```

### 2. Configure Environment

Create `.env` file based on `.env.example`:

```bash
DB_NAME=<database_name>
DB_USER=<database_user>
DB_PASS=<database_password>
TEST_DB_NAME=<test_database_name>
TEST_DB_USER=<test_database_user>
TEST_DB_PASS=<test_database_password>
GCP_PROJECT=<your-gcp-project-id>
TOPIC=<your-pubsub-topic-name>
JWT_SECRET=<your_jwt_secret_key>
```

### 3. Available Scripts

```json
"scripts": {
  "test": "jest",
  "start": "node index.js", 
  "dev": "nodemon index.js"
}
```

## API Documentation

### User Endpoints
- `POST /v4/user` - Create user account
- `GET /v4/user/self` - Get user details (authenticated)
- `PUT /v4/user/self` - Update user details (authenticated)

### Health Check
- `GET /healthz` - Service health status

## Testing

Run tests with:
```bash
npm test
```

## References

- [Express](https://expressjs.com/en/4x/api)
- [Sequelize](https://sequelize.org/docs/v6/)
- [Jest](https://jestjs.io/docs/getting-started)
- [SuperTest](https://www.npmjs.com/package/supertest)
