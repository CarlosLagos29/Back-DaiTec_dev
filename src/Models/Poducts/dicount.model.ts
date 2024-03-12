import mongoose from 'mongoose';

export interface DiscountInterface{
    percent: number
}

export const DiscountSchema = new mongoose.Schema<DiscountInterface>({
    percent: { type: Number, required: true }
  });
