// import library
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// import components
import AuthRoute from "./src/routers/Auth.route.js";
import CustomerRoute from "./src/routers/Customer.route.js";
import StoreRoute from "./src/routers/Store.route.js";
import ServiceRoute from "./src/routers/Service.route.js";

const app = express();
dotenv.config();
const corsOptions = {
  credentials: true, // This is important.
  origin: true,
};
app.use(cors(corsOptions));

//connection to database
mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("common"));
//route for Store
app.use("/api/store", StoreRoute);
//route for Service
app.use("/api/service", ServiceRoute);
//route for Auth
app.use("/api/auth", AuthRoute);
//route for Customer
app.use("/api/customer", CustomerRoute);

app.listen(8800, () => {
  console.log("Server is running");
});