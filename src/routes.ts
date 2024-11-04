import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { justifyText } from './justify';
import {authenticateToken, rateLimit} from './middlewares';
dotenv.config();

const router = express.Router();
const JWT_KEY = process.env.JWT_KEY ||'';

/**
 * @swagger
 * /justify:
 *   post:
 *     summary: Justify a given text
 *     description: Justifies the input text to align with a maximum line length, distributing spaces evenly.
 *     tags: [Text Justification]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: "This is an example of text that needs to be justified."
 *     responses:
 *       200:
 *         description: Successfully justified text
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       400:
 *         description: Bad Request - Text is required
 *       401:
 *         description: Unauthorized - Token is required
 *       402:
 *         description: Payment Required - Daily word limit exceeded
 */
router.post('/justify', authenticateToken, rateLimit, (req: any, res: any)=> {
    try {
        const text = typeof req.body === 'string' ? req.body : '';

        if (!text || text.length === 0) {
            return res.status(400).json({ message: 'Text is required to justify' });
        }

        const justifiedText = justifyText(text);
        return res.type('text/plain').send(justifiedText);
    } catch (error) {
        console.error('Error in /justify route:', error);
        res.sendStatus(500);
    }});

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate a new JWT token
 *     description: Generates a token for the given email, which can be used for authentication.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Successfully generated token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request - Email is required
 */
router.post('/token', (req: any, res: any) => {
    try{
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const token = jwt.sign({ email }, JWT_KEY, { expiresIn: '1d' });

        res.json({ token });
    } catch (error) {
        console.error('Error in /token route:', error);
        res.sendStatus(500);
    }});

export default router;
