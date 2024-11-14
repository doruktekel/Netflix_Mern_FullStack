import mongoose from "mongoose";
import { envVars } from "./envVars.js";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(envVars.MONGO_URI);
    console.log(
      `Database connected , Host : ${conn.connection.host} , Port : ${conn.connection.port}  `
    );
  } catch (error) {
    console.log("Connection problem with mongo", error.message);
    process.exit(1);
  }
};
