// Import the required modules
import fs from "fs";
import path from "path"; // Built-in Node.js module for handling and transforming file paths.
import { fileURLToPath } from "url"; // Converts ES module URLs to file paths for compatibility with CommonJS-style modules.
import dotenv from "dotenv"; // Securely loads environment variables from a .env file into process.env.
import morgan from "morgan"; // HTTP request logger for monitoring traffic and debugging issues.
import cors from "cors"; // Enables Cross-Origin Resource Sharing, controlling which origins can access the API.
import helmet from "helmet"; // Adds security headers to prevent well-known web vulnerabilities.
import rateLimit from "express-rate-limit"; // Limits the rate of incoming requests to prevent abuse or denial-of-service (DoS) attacks.

import express from "express"; // Express framework for building web servers.
import router from "./routes/router.js";

import swaggerUi from "swagger-ui-express"; // Serves API documentation for developers to understand and interact with the API.
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8")); // Contains OpenAPI/Swagger specification for documenting API routes.

// Load environment variables
dotenv.config(); // Ensures sensitive data like database credentials are not hardcoded in the application.

// Create an instance of an Express app
const app = express();
// Define the port for the server, defaulting to 3000 if not set in the environment
const PORT = process.env.PORT || 3000; // Uses environment variables for configurability and prevents hardcoded values.

// Mount the router for root and API routes
app.use("/", router); // Root routes are now handled by `router.js`
app.use("/api", router); // API routes are handled by `router.js`

// Middleware for logging, security, and parsing
app.use(morgan("combined")); // Logs HTTP requests with detailed information for traffic monitoring and forensic analysis.

app.use(helmet()); // Configures HTTP headers to secure the application against attacks like XSS, clickjacking, and others.

app.use(
  cors({
    origin: ["http://localhost:3000"], // Restricts access to only the specified origin for same-site development.
    methods: ["GET", "POST"], // Limits allowed HTTP methods to minimize attack vectors.
  })
);

// Request rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window.
  max: 100, // Maximum of 100 requests per IP per window.
});
app.use(limiter); // Prevents abuse and DoS attacks by throttling excessive requests.

// Resolve the __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Ensures compatibility with ES module syntax.

// Middleware to parse incoming JSON requests
app.use(express.json()); // Parses incoming JSON payloads, enabling secure handling of client data.

// Serve static files from the "public" directory
app.use(
  express.static(path.join(__dirname, "public"), {
    fallthrough: true, // Allows other middleware to handle requests if the static file isn't found.
    onerror: (err, req, res) => {
      console.error(`Static file error for ${req.path}:`, err); // Logs errors when serving static files for auditing.
      res.status(500).send("Error serving static file"); // Prevents stack traces from leaking to the client.
    },
  })
);

// Dynamically update Swagger document for host and schemes
const updatedSwaggerDocument = JSON.parse(
  JSON.stringify(swaggerDocument).replace(
    '"host": "localhost:3000"',
    `"host": "${process.env.HOST || "localhost:3000"}"`
  )
);
// Serve Swagger documentation at the /api-docs endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(updatedSwaggerDocument)); // Provides interactive API documentation for developers.

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "UP", timestamp: new Date().toISOString() }); // Simple endpoint to verify server availability and uptime.
});

// Fallback for unhandled API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" }); // Ensures consistent error responses for undefined API routes.
});

// Catch-All Route for Undefined Routes
app.use((req, res) => {
  res.status(404).send("Page not found"); // Provides a controlled response for undefined non-API routes.
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs detailed stack trace for debugging and auditing.
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
      path: req.originalUrl, // Includes the request path in the error response for traceability.
      timestamp: new Date().toISOString(), // Adds a timestamp to correlate logs and errors during analysis.
    },
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Logs startup details for operational monitoring.
});

// Gracefully shut down the server
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully..."); // Indicates the shutdown process has started.
  process.exit(0); // Ensures the application exits cleanly.
});
