import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import 'dotenv/config';
import connectDB from './config/db'
import route from './routes/index';
import ErrorHandler from './middlewares/error.middleware'
import logger from './logger';
import { swagger_url } from './config/config';

const app: Application = express();

const PORT = process.env.PORT

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A simple version of calendly system api",
      version: "1.0.0",
    },
    license: {
      name: "ISC",
    },
    contact: {
      name: "Ayomipo",
      email: "ayomiposolaja@email.com",
    },
    schemes: ["http", "https"],
    servers: [
      { url: `${swagger_url}` }
    ],
  },
  apis: [
    `${__dirname}/swagger.yaml`
  ],
};

const swaggerSpecs = swaggerJsDoc(options);

app.use(cors())

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

app.use('/v1', route)

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