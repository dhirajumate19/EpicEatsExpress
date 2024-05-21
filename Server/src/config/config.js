import "dotenv/config";

const {
  PORT = 3001,
  DB_URL = "mongodb://127.0.0.1",
  DB_PORT = 27017,
} = process.env;
console.log(process.env.PORT);
export const port = PORT;
export const DBurl = `${DB_URL}:${DB_PORT}`;
