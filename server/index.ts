require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { router } from "./Routes/Router";
import { PostgresContext } from "./Database/PostgresContext";
const app: Application = express();
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
  try {
    const dbContext = PostgresContext.getInstance();
    await dbContext.initialize();

    app.listen(PORT, () => {
      console.log(`Server has been started on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
})();
