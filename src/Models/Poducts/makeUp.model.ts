import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { DiscountInterface, DiscountSchema } from './dicount.model';

export interface MakeUpinterface {
   name: string
   img: Array<string>
   price: number
   available: number
   colors: Array<string>
   description: string
   discount?: DiscountInterface
};

const MakeUpSchema = new mongoose.Schema<MakeUpinterface>({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   img: [{ type: String, required: true }],
   available: { type: Number, required: true },
   colors: [{ type: String, required: false }],
   description: { type: String, required: true },
   discount: { type: DiscountSchema, required: false },
}, { versionKey: false });

export const MakeUp: Model<MakeUpinterface> = mongoose.model<MakeUpinterface>("MakeUp", MakeUpSchema);