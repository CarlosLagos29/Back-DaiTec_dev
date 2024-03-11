import { Model } from 'mongoose';
import mongoose from 'mongoose';

export interface ProfecionalsInterface {
    name: string
    img: string
    description: string
    services: Array<string>
}

const ProfecionalsSchema = new mongoose.Schema<ProfecionalsInterface>({
    name:{type: String, required: true},
    img:{type: String, required: true},
    description:{type: String, required: true},
    services: [{type: String, required: true}],
},{versionKey: false})

export const Profecionals: Model<ProfecionalsInterface> = mongoose.model<ProfecionalsInterface>("Profecional", ProfecionalsSchema);