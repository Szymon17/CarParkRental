import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    orders: { type: [{ id: String, carIndex: Number }], required: true },
    createdAt: { type: Date, required: true },
  },
  { collection: "Users" }
);

export default mongoose.model("Users", User);
