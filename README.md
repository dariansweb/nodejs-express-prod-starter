# Node.js Express Production Starter

**A production-ready Node.js Express template with Swagger, security, scalability, and everything else you need to hit the ground running!**

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Swagger UI**: Interactive API documentation for seamless development and testing.
- **Security Enhancements**:
  - `helmet`: Sets various HTTP headers to help protect your app.
  - `cors`: Enables Cross-Origin Resource Sharing with configurable options.
  - `express-rate-limit`: Basic rate-limiting middleware to protect against brute-force attacks.
- **Environment Configuration**: Managed via `dotenv` for secure and flexible environment variable handling.
- **Logging**: HTTP request logging with `morgan` for better insight into application traffic.
- **Modular Structure**: Organized file system for controllers, routes, and middleware to promote scalability and maintainability.
- **Testing Setup**: Integrated testing environment using `jest` and `supertest` for robust application testing.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dariansweb/nodejs-express-prod-starter.git
   cd nodejs-express-prod-starter
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory.
   - Refer to `.env.example` for the required environment variables and add them to your `.env` file.

### Running the Application

- **Development Mode**:

  ```bash
  npm start
  ```

  The server will start at `http://localhost:3000`.

- **Production Mode**:

  Ensure all environment variables are set appropriately, then:

  ```bash
  npm run build
  npm run start:prod
  ```

### API Documentation

Access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

This interface allows you to explore and test the API endpoints with ease.

## Project Structure

```plaintext
nodejs-express-prod-starter/
├── controllers/        # Controllers for handling requests
├── middleware/         # Custom middleware functions
├── models/             # Data models (e.g., Mongoose schemas)
├── routes/             # Express route definitions
├── tests/              # Test cases for the application
├── app.js              # Main application entry point
├── package.json        # Project metadata and dependencies
├── swagger.json        # Swagger configuration for API documentation
└── .env.example        # Example environment variables file
```

## Scripts

- **Start Application**:

  ```bash
  npm start
  ```

- **Run Tests**:

  ```bash
  npm test
  ```

- **Run Tests in Watch Mode**:

  ```bash
  npm run test:watch
  ```

- **Run Tests with Coverage**:

  ```bash
  npm run test:coverage
  ```

- **Linting**:

  ```bash
  npm run lint
  ```

- **Format Code**:

  ```bash
  npm run format
  ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
