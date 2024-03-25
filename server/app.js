import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is Working Fine !!",
  });
});

export default app;
