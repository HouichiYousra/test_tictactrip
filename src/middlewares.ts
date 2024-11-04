import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const JWT_KEY = process.env.JWT_KEY ||'';

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

export default authenticateToken;