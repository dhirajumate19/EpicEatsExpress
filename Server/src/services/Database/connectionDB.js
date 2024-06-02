import mongoose from "mongoose";
import { DBurl } from "./db.config.js";

export const ConnectionDB = async () => {
  mongoose
    .connect(`${DBurl}/EpicEatsExpress`)
    .then(() => {
      console.log("DB Connection Successfull");
    })
    .catch(() => {
      console.log("Failed");
    });
};
