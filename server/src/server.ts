import "dotenv/config";
import express from "express";
import api from "./routes/api.js";

const app = express();

app.use(express.json());
app.use(api);

app.listen(process.env.PORT, () => {
  console.log(`starting server at port ${process.env.PORT}...`);
});
