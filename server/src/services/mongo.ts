import "dotenv/config";
import mongoose from "mongoose";

const uri = `mongodb+srv://my-api:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connection.on("open", () => {
  console.log("mongoDB is ready");
});

mongoose.connection.on("error", err => {
  console.log(err);
});

async function mongoConnet() {
  await mongoose.connect(uri);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { mongoConnet, mongoDisconnect };
