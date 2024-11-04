import request from 'supertest';
import app from '../app';

describe('API Tests', () => {
    it('should generate a token', async () => {
        const response = await request(app).post('/api/token').send({ email: 'test@example.com' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should justify long text correctly', async () => {
        const tokenResponse = await request(app).post('/api/token').send({ email: 'test@example.com' });
        const token = tokenResponse.body.token;

        const longParagraph = `This is a long paragraph that will be used to test the justification of text. 
        The quick brown fox jumps over the lazy dog. This is a sample text designed to exceed the maximum 
        line length set in the justification function, ensuring that the function properly adds spaces 
        between words to align the text to the maximum length.`;
    
        const response = await request(app)
            .post('/api/justify')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'text/plain')
            .send(longParagraph);
        expect(response.status).toBe(200);
        expect(response.text).toBeDefined();
    
        // Split the justified text into lines for further checks
        const justifiedLines = response.text.split('\n');
    
        // Check that each line is properly justified
        justifiedLines.forEach(line => {
            // Check if line length is less than or equal to 80
            expect(line.length).toBeLessThanOrEqual(80);
            
            // Check that the line is not empty
            expect(line.trim()).not.toBe('');
    
            // Check that if the line is not the last one, it should have maximum length
            if (line !== justifiedLines[justifiedLines.length - 1]) {
                expect(line.length).toBe(80);
            }
        });
    });
    
    it('should return 400 for empty justify text', async () => {
        const tokenResponse = await request(app).post('/api/token').send({ email: 'test@example.com' });
        const token = tokenResponse.body.token;

        const response = await request(app)
            .post('/api/justify')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'text/plain')
            .send('');

        expect(response.status).toBe(400);
    });

    it('should return 401 for unauthorized access', async () => {
        const response = await request(app).post('/api/justify').send('This is a test sentence to justify.');
        expect(response.status).toBe(401);
    });
});