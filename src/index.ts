import express, { Application } from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import mongoose from "mongoose";
import { CurrentUser, verifyToken } from "./middleware/auth";
import { logger } from "./utils/logger";
import responseTime from 'response-time'

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser
    }
  }
}

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(responseTime());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use('/api', verifyToken)
app.use(Router);

const start = async () => {
  try {
    dotenv.config();

    const API_PORT = process.env.API_PORT || 8000;
    const MONGO_URI = process.env.MONGO_URI || 'localhost';
    const MONGO_PORT = process.env.MONGO_PORT || 27017;
    const MONGO_DB = process.env.MONGO_DB || 'shoppingcart-mg';
    const server = app.listen(API_PORT, () => logger.info(`Server started and running on port: ${API_PORT}`));

    // Connect to MongoDB
    await mongoose.connect(`mongodb://${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`);

    // Graceful shutdown
    let connections: any = [];

    server.on('connection', (connection) => {
      // register connections
      connections.push(connection);

      // remove/filter closed connections
      connection.on('close', () => {
        connections = connections.filter((currentConnection: any) => currentConnection !== connection);
      });
    });

    function shutdown() {
      logger.info('Received kill signal, shutting down gracefully');

      server.close(() => {
        logger.info('Closed out remaining connections');

        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 20000);

      // end current connections
      connections.forEach((connection: any) => connection.end());

      // then destroy connections
      setTimeout(() => {
        connections.forEach((connection: any) => connection.destroy());
      }, 10000);
    }

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

start();