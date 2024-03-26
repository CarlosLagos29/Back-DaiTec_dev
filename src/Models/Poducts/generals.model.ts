import { Model } from 'mongoose';
import mongoose from 'mongoose';

export interface Generalsnterface {
   name: string
   img: Array<string>
   price: number
   available: number
   colors: Array<string>
   description: string
   source: string
   discount?: number
};

const GeneralsSchema = new mongoose.Schema<Generalsnterface>({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   img: [{ type: String, required: true }],
   available: { type: Number, required: true },
   colors: [{ type: String, required: false }],
   description: { type: String, required: true },
   source: { type: String, default: 'generals' },
   discount: { type: Number, default: 0 },
}, { versionKey: false });

export const Generals: Model<Generalsnterface> = mongoose.model<Generalsnterface>("General", GeneralsSchema);