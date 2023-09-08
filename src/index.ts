import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);
app.use(Router);

const start = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/shoppingcart-mg");
      app.listen(PORT, () => console.log("Server started on port", PORT));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

start();