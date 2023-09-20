import { Get, Route, Tags } from "tsoa";
import { AppService } from "../services/app.service";
import mongoose from "mongoose";
import dotenv from 'dotenv';

@Route("/health")
@Tags('health')
export default class HealthController {
    appService: AppService = new AppService();

    constructor() {
        dotenv.config();
    }

    @Get("/")
    public async health(): Promise<any> {        
        const MONGO_URI = process.env.MONGO_URI || 'localhost';
        const MONGO_PORT = process.env.MONGO_PORT || 27017;
        const MONGO_DB = process.env.MONGO_DB || 'shoppingcart-mg';        

        try {
            const mongo = await mongoose.connect(`mongodb://${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`);

            if (mongo.connections[0].readyState === 1) {
                return { status: 200, message: 'Application is healthy' };
            }
        } catch (error) {
            return { status: 500, message: 'Error connecting to database' }
        }
    }
}
