import mongoose from 'mongoose';

export interface DiscountInterface {
    ofert: boolean
    percent: number
}

export const DiscountSchema = new mongoose.Schema<DiscountInterface>({
    ofert: {
        type: Boolean,
        default: false,
        required: true
    },
    percent: {
        type: Number,
        default: 0,
        required: true
    }
});
