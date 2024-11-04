import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const JWT_KEY = process.env.JWT_KEY || '';
const WORDS_LIMIT = process.env.WORDS_LIMIT || 80000;;

const authenticateToken = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.headers['authorization']?.split(' ')[1]; //Bearer token format

    if (!token) {
        res.sendStatus(401); 
        return;
    }

    jwt.verify(token, JWT_KEY, (err) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        next();
    });
};

const wordCountStore: Record<string, { count: number; date: Date }> = {};

const rateLimit = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        res.status(401).json({ message: 'Token is required' });
        return;
    }

    const currentDate = new Date();
    
    if (!wordCountStore[token]) {
        wordCountStore[token] = { count: 0, date: currentDate };
    }

    const { count, date } = wordCountStore[token];

    if (date.toDateString() !== currentDate.toDateString()) {
        wordCountStore[token] = { count: 0, date: currentDate };
    }

    const wordsToJustify = req.body ? req.body.split(/\s+/).length : 0;

    if (count + wordsToJustify > WORDS_LIMIT) {
        res.status(402).json({ message: 'Payment Required: Daily word limit exceeded' });
        return;
    }

    wordCountStore[token].count += wordsToJustify;
console.log(count)
    next(); 
};

export { authenticateToken, rateLimit };
