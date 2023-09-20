import winston from "winston";
import dotenv from "dotenv";

export let logger: winston.Logger;

const startLogger = async () => {
    dotenv.config();
    const ENVIRONMENT = process.env.ENVIRONMENT || 'development';    
    const logConfig = ENVIRONMENT === 'production' ? { filename: "error.log" , level: "error" } : { filename: "error.log", level: "info" };

    logger = winston.createLogger({
        level: "info",
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File(logConfig),
        ],
    });
}

// Log an error message
startLogger();
