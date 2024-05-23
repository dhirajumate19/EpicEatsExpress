import express from "express";
import "dotenv/config";
import { ConnectionDB } from "./src/services/connectionDB.js";

import userRouter from "./src/APi/users/users.routes.js";
import { App_PORT, S_Key } from "./config.js";

const app = express();

app.use(express.json());
ConnectionDB();
app.use("/api/v1", userRouter);
app.listen(App_PORT, () => {
  console.log(`The Surver is running on Port  ${App_PORT}`);
  console.log(`secreat key ${S_Key}`);
});
