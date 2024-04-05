import mongoose from "mongoose";

export interface ColorsInterface {
    name: string;
    availity: number;
};

export const ColorsSchema = new mongoose.Schema<ColorsInterface>({
    name: { type: String, required: true },
    availity: { type: Number, required: true },
}, { versionKey: false });

