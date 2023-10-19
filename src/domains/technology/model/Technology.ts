import { Schema, model } from "mongoose";
import { TechnologyType } from "../types/TechnologyType";

const TechnologySchema = new Schema<TechnologyType>({
    name: { type: String, required: true }
}, { timestamps: true })

export const Technology = model('Technology', TechnologySchema)