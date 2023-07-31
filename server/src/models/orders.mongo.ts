import mongoose from "mongoose";

const Orders = new mongoose.Schema(
  {
    car_id: { type: String, require: true },
    user_id: { type: String, require: true },
    date_of_receipt: { type: Date, require: true },
    date_of_return: { type: Date, require: true },
    place_of_receipt: { type: String, require: true },
    place_of_return: { type: String, require: true },
    cancel: { type: Boolean, require: true },
  },
  { collection: "Orders" }
);

export default mongoose.model("Orders", Orders);
