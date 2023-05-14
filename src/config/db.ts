import mongoose from 'mongoose';
import logger from '../logger';
import 'dotenv/config';
import { HttpException } from '../exceptions/HttpException';


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        logger.info('Database connected successfully.');
    } catch(error: any) {
        logger.error(`Unable to connect to the database: ${error}`);
        throw new HttpException(500, 'Unable to connect to the database');
    }
}

export default connectDB