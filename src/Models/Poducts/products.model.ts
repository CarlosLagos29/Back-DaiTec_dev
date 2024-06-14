import { PaginateModel, Schema, model } from 'mongoose';
import { ColorsSchema } from './colors.model';
import { ProductsInterface } from '../../Types/products.types';

import paginate from 'mongoose-paginate-v2';

const ProductsSchema = new Schema<ProductsInterface>({
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    price: { type: Number, required: true },
    available: { type: Number, default: 0, required: false },
    colors: { type: [ColorsSchema], required: false },
    description: { type: String, required: true },
    source: {
        type: String,
        enum: ["skincares", "makeups", "generals"],
        required: true
    },
    discount: { type: Number, default: 0, required: false },
    skinType: {
        type: String,
        enum: ["Facial", "Corporal", "Facial y Corporal"],
        required: false
    },
    crema: { type: String, required: false },
}, { versionKey: false });

ProductsSchema.plugin(paginate);

const Products: PaginateModel<ProductsInterface> = model<ProductsInterface, PaginateModel<ProductsInterface>>("Products", ProductsSchema);

export default Products;