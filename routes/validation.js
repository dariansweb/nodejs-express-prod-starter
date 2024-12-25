// routes/validation.js
import { body, validationResult } from 'express-validator';

export const validateEmail = [
    body('email').isEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];