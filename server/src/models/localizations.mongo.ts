import mongoose from "mongoose";

const Localizations = new mongoose.Schema(
  {
    localization: { type: String, require: true },
  },
  { collection: "Localizations" }
);

export default mongoose.model("Localizations", Localizations);
