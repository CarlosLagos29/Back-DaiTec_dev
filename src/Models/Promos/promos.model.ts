import PromosInterface from "../../Types/promos.types";
import { Model, Schema, model } from "mongoose";

const PromoSchema = new Schema<PromosInterface>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Promos: Model<PromosInterface> = model<PromosInterface>(
  "Promos",
  PromoSchema
);

export default Promos;
