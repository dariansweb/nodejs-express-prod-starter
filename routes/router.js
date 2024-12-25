// routes/router.js
import express from 'express';
import { validateEmail } from './validation.js';

const router = express.Router();

// Define the root route (GET /)
// Sends a simple welcome message as the response
router.get('/', (req, res) => {
    res.send('Hello, world! Welcome to your basic Node.js Express server. from router.js');
});

// Define a route (GET /api/greeting)
// Sends a JSON response with a greeting message
router.get('/api/greeting', async (req, res, next) => {
    try {
        res.json({ message: 'Hello from the API! in router.js' });
    } catch (error) {
        next(error);
    }
});

// Example route using fetch (GET /api/external)
// Demonstrates making an external HTTP request and returning the response
router.get('/api/external', async (req, res, next) => {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/api/data', validateEmail, (req, res) => {
    res.json({ message: 'Data received successfully!' });
});

export default router;
