import express from "express";
const app = express();

app.use(express.json());

app.listen(3001, () => {
  console.log("The Surver is running on Port 3001");
});
