import { model, Document, Schema, PaginateModel } from 'mongoose';
import  paginate  from 'mongoose-paginate-v2';
import { ColorsSchema, ColorsInterface } from './colors.model';
import { skinCareInterface } from './skinCares.model';

export interface MakeUpinterface extends Document {
   name: string
   img: Array<string>
   price: number
   available?: number
   colors?: ColorsInterface[]
   description: string
   source: string
   discount?: number
};

const MakeUpSchema = new Schema<MakeUpinterface>({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   img: [{ type: String, required: true }],
   available: { type: Number, required: false },
   colors: [ColorsSchema],
   description: { type: String, required: true },
   source: { type: String, default: 'makeups' },
   discount: { type: Number, default: 0 },
}, { versionKey: false });

MakeUpSchema.plugin(paginate);

export const MakeUp: PaginateModel<MakeUpinterface> = model<MakeUpinterface, PaginateModel<skinCareInterface>>("MakeUp", MakeUpSchema);