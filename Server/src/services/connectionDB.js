import mongoose from "mongoose";
import { DBurl } from "../../config.js";

export const ConnectionDB = async () => {
  console.log(DBurl);

  mongoose
    .connect(`${DBurl}/EpicEatsExpress`)
    .then(() => {
      console.log("DB Connection Successfull");
    })
    .catch(() => {
      console.log("Failed");
    });
};
