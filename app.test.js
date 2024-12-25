import request from 'supertest';
import app from './app.js'; // Ensure your app export is structured for testing

describe('GET /api/greeting', () => {
    it('should return a greeting message', async () => {
        const res = await request(app).get('/api/greeting');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Hello from the API!');
    });
});