import type PromosInterface from "../../Types/promos.types.ts";
import type { Model } from "mongoose";
import { Schema, model } from "mongoose";

const PromoSchema = new Schema<PromosInterface>(
    {
        name: { type: String, required: true },
        url: { type: String, required: true },
        date: { type: Date, default: Date.now },
    },
    { versionKey: false },
);

const Promos: Model<PromosInterface> = model<PromosInterface>("Promos", PromoSchema);

export default Promos;
