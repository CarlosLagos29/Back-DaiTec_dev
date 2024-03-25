import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { DiscountInterface, DiscountSchema } from './dicount.model';


export type skinTypes = "Facial" | "Corporal" | "Facial y Coporal";

export interface skinCareInterface {
    name: string
    img: Array<string>
    description: string
    skinType: skinTypes
    price: number
    available: number
    crema: string
    source: string
    discount?: DiscountInterface
}

const SkinCareSchema = new mongoose.Schema<skinCareInterface>({
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    description: { type: String, required: true },
    skinType: {
        type: String,
        enum: ["Facial", "Corporal", "Facial y Coporal"],
        required: true
    },
    price: { type: Number, required: true },
    available: { type: Number, required: true },
    crema: { type: String, required: true },
    source: { type: String, default: 'skincares' },
    discount: { type: DiscountSchema, required: false },
}, { versionKey: false });

export const SkinCare: Model<skinCareInterface> = mongoose.model<skinCareInterface>("SkinCare", SkinCareSchema)

