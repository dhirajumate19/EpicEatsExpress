import express from "express";
import "dotenv/config";
import { ConnectionDB } from "./src/services/connectionDB.js";

import userRouter from "./src/APi/users/users.routes.js";
import { App_PORT, S_Key } from "./config.js";
import foodRouter from "./src/APi/food/food.routes.js";

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
  console.log(`secreat key ${S_Key}`);
});
