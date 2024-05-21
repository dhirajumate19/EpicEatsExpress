import express from "express";
import { ConnectionDB } from "./src/config/connectionDB.js";
import { port } from "./src/config/config.js";
import userRouter from "./src/APi/users/users.routes.js";

const app = express();

app.use(express.json());
ConnectionDB();
app.use("/api/v1", userRouter);
app.listen(port, () => {
  console.log(`The Surver is running on Port  ${port}`);
});
