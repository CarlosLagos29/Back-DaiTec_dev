import { PaginateModel, Document, Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ColorsSchema, ColorsInterface } from './colors.model';

export interface Generalsnterface extends Document {
   name: string
   img: Array<string>
   price: number
   available?: number
   colors?: ColorsInterface[]
   description: string
   source: string
   discount?: number
};

const GeneralsSchema = new Schema<Generalsnterface>({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   img: [{ type: String, required: true }],
   available: { type: Number, default: 0, required: false },
   colors: [ColorsSchema],
   description: { type: String, required: true },
   source: { type: String, default: 'generals' },
   discount: { type: Number, default: 0 },
}, { versionKey: false });

GeneralsSchema.plugin(paginate);

export const Generals: PaginateModel<Generalsnterface> = model<Generalsnterface, PaginateModel<Generalsnterface>>("General", GeneralsSchema);