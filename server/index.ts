require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { router } from "./Routes/Router";
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));

app.use("/api", router);

(async () => {
  app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`);
  });
})();
