import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import 'dotenv/config';
import connectDB from './config/db'
import route from './routes/index';
import ErrorHandler from './middlewares/error.middleware'
import logger from './logger';

const swaggerDocument = require('../public/swagger.json');

const app: Application = express();

const PORT = process.env.PORT

app.use(cors())

app.use(express.json())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(route)

app.use(ErrorHandler)

app.get('/', (req, res) => {
  return res.json('Welcome to calendara');
})

try {
  app.listen(PORT, async(): Promise<void> => {
    await connectDB();
    logger.info(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
    logger.error(`Error occurred: ${error}`);
}