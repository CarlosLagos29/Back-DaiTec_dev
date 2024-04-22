import { PaginateModel, Document, Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export type skinTypes = "Facial" | "Corporal" | "Facial y Coporal";

export interface skinCareInterface extends Document{
    name: string;
    img: string[];
    description: string;
    skinType: skinTypes;
    price: number;
    available: number;
    crema: string;
    source: string;
    discount?: number;
}

const SkinCareSchema = new Schema<skinCareInterface>({
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    description: { type: String, required: true },
    skinType: {
        type: String,
        enum: ["Facial", "Corporal", "Facial y Coporal"],
        required: true
    },
    price: { type: Number, required: true },
    available: { type: Number, default: 0, required: true },
    crema: { type: String, required: true },
    source: { type: String, default: 'skincares' },
    discount: { type: Number, default: 0 },
}, { versionKey: false });

SkinCareSchema.plugin(paginate);

export const SkinCare: PaginateModel<skinCareInterface> = model<skinCareInterface, PaginateModel<skinCareInterface>>("SkinCare", SkinCareSchema);

