import mongoose, {Mongoose} from 'mongoose';
import logger from './logger';

import '@/database';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('MongoDB URI not found in mongoose.ts');
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}


const dbConnect = async (): Promise<Mongoose> => {
    if(cached.conn) {
        logger.info('Using existing database connection');
        return cached.conn
    };
    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI,{
            dbName: 'devflow',
        }).then((result) =>{
            logger.info('Connected to MongoDB');
            return result;
        }).catch((e) =>{
            logger.error('Error connecting to MongoDB', e);
            throw e;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;