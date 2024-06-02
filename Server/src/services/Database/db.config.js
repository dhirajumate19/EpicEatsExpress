const { DB_URL = "mongodb://127.0.0.1", DB_PORT = "27017" } = process.env;
export const DBurl = `${DB_URL}:${DB_PORT}`;
