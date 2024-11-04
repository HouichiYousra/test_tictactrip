import express from 'express';
import { justifyText } from './justify';

const router = express.Router();

router.post('/justify', (req: any, res: any)=> {
    const text = req.body as string;

    if (!text) {
        return res.status(400).json({ message: 'Text is required to justify' });
    }

    const justifiedText = justifyText(text);
    return res.type('text/plain').send(justifiedText);
});

export default router;
