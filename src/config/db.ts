import mongoose from 'mongoose';
import logger from '../logger';
import 'dotenv/config';
import { HttpException } from '../exceptions/HttpException';
import { StatusCodes } from 'http-status-codes';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        logger.info('Database connected successfully.');
    } catch(error: any) {
        logger.error(`Unable to connect to the database: ${error}`);
        throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Unable to connect to the database');
    }
}

export default connectDB