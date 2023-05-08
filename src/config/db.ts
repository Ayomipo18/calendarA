import mongoose from 'mongoose';
import logger from '../logger';
import 'dotenv/config';


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        logger.info('Database connected successfully.');
    } catch(error: any) {
        logger.error(`Unable to connect to the database: ${error}`);
    }
}

export default connectDB