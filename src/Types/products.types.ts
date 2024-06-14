import { ColorsInterface } from "../Models/Poducts/colors.model";
import { Document } from "mongoose";

export type skinTypes = "Facial" | "Corporal" | "Facial y Corporal";
export type sourceType = "skincares" | "makeups" | "generals";

export interface ProductsInterface extends Document {
    name: string;
    img: string[];
    price: number;
    available?: number;
    colors?: ColorsInterface[];
    skinType?: skinTypes;
    crema?: string;
    description: string;
    source: sourceType;
    discount?: number;
}