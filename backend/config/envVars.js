import dotenv from "dotenv";

dotenv.config();

export const envVars = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
  SERVICE_API_KEY: process.env.SERVICE_API_KEY,
};
