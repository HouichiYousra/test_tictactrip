import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Text Justification API',
            version: '1.0.0',
            description: 'API for justifying text with authentication and rate limiting',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.text());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
