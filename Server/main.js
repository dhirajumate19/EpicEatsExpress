import express from "express";
import "dotenv/config";

import userRouter from "./src/APi/users/users.routes.js";
import { App_PORT } from "./config.js";
import foodRouter from "./src/APi/food/food.routes.js";
import { ConnectionDB } from "./src/services/Database/connectionDB.js";

//create instance of express
const app = express();
// Parse JSON bodies up to 50MB
app.use(express.json({ limit: "50mb" }));

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

//connect MongoDB
ConnectionDB();

//routes
app.use("/api/v1", userRouter);
app.use("/api/v1", foodRouter);

app.listen(App_PORT, () => {
  console.log(`The Surver is running on Port  ${App_PORT}`);
});
