import "dotenv/config";
import { mongoConnet } from "./services/mongo.js";
import express from "express";
import cookieParser from "cookie-parser";
import api from "./routes/api.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(api);

async function startServer() {
  await mongoConnet();
  console.log(`starting server at port ${process.env.PORT}...`);
}

app.listen(process.env.PORT, startServer);
