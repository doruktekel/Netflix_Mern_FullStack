import express from "express";
import cookieParser from "cookie-parser";

import { envVars } from "./config/envVars.js";
import { connectDb } from "./config/dB.js";
import authRouter from "./routers/auth.router.js";
import movieRouter from "./routers/movie.router.js";
import tvRouter from "./routers/tv.router.js";
import { protectRoute } from "./middlewares/protectRoute.js";
import searchRouter from "./routers/search.router.js";

const app = express();

const PORT = envVars.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRouter);
app.use("/api/v1/tv", protectRoute, tvRouter);
app.use("/api/v1/search", protectRoute, searchRouter);

app.listen(PORT, () => {
  try {
    console.log(`App working in ${PORT}`);
    connectDb();
  } catch (error) {
    console.log("Listening port or connect db problem");
  }
});
