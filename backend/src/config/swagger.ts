// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'API documentation for the Restaurant management system',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, but indicates that the token is a JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply BearerAuth globally for all endpoints that require authentication
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/dtos/*.ts'],  // Paths to your API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
