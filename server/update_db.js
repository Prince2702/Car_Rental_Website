import mongoose from 'mongoose';
import Car from './models/Car.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { dbName: "car-rental" }).then(async () => {
    const res = await Car.updateMany({brand: 'BMW', model: 'X5'}, {$set: {image: '/bmw_x5.png'}});
    console.log('Updated BMW images:', res);
    process.exit(0);
}).catch(console.error);
