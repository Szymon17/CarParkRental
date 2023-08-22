import "dotenv/config";
import { mongoConnet } from "./services/mongo.js";
import { __dirname } from "./utils/paths.js";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import api from "./routes/api.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(api);

app.use(express.static(path.join(__dirname, "..", "..", "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

async function startServer() {
  await mongoConnet();
  console.log(`starting server at port ${process.env.PORT}...`);
}

app.listen(process.env.PORT, startServer);
