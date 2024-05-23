import "dotenv/config";

const {
  PORT = 3001,
  DB_URL = "mongodb://127.0.0.1",
  DB_PORT = "27017", // Default value if not provided in .env
  SECRET_KEY = "EEE3", // Corrected the typo from SECRETE_KEY to SECRET_KEY
} = process.env;

export const S_Key = SECRET_KEY;
export const App_PORT = PORT;
export const DBurl = `${DB_URL}:${DB_PORT}`;
