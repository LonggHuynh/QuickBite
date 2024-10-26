import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './config/swagger';
import authRoutes from './routes/AuthRoutes';
import dishRoutes from './routes/DishRoutes';
import restaurantRoutes from './routes/RestaurantRoutes';
import uploadRoutes from './routes/UploadRoutes';
import orderRoutes from './routes/OrderRoutes';
import { errorMiddleware } from './middlewares/ErrorMiddleware';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,  
    allowedHeaders: ['Authorization', 'Content-Type'],  
    exposedHeaders: ['Authorization'],  
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorMiddleware);



export default app;
