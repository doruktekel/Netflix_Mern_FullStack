import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRouter from "./routers/auth.router.js";
import movieRouter from "./routers/movie.router.js";
import tvRouter from "./routers/tv.router.js";
import searchRouter from "./routers/search.router.js";

import { envVars } from "./config/envVars.js";
import { connectDb } from "./config/dB.js";
import { protectRoute } from "./middlewares/protectRoute.js";

const app = express();

const PORT = envVars.PORT || 3001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRouter);
app.use("/api/v1/tv", protectRoute, tvRouter);
app.use("/api/v1/search", protectRoute, searchRouter);

if (envVars.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  try {
    console.log(`App working in ${PORT}`);
    connectDb();
  } catch (error) {
    console.log("Listening port or connect db problem");
  }
});
