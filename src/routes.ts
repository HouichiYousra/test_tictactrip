import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { justifyText } from './justify';

dotenv.config();

const router = express.Router();
const JWT_KEY = process.env.JWT_KEY ||'';

router.post('/justify', (req: any, res: any)=> {
    const text = req.body as string;

    if (!text) {
        return res.status(400).json({ message: 'Text is required to justify' });
    }

    const justifiedText = justifyText(text);
    return res.type('text/plain').send(justifiedText);
});

router.post('/token', (req: any, res: any) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const token = jwt.sign({ email }, JWT_KEY, { expiresIn: '1d' });

    res.json({ token });
});

export default router;
