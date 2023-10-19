import { Schema, model } from "mongoose"
import { CityType } from "../types/CityType"

const CitySchema = new Schema<CityType>({
    name: { type: String, required: true },
},{ timestamps: true })

export const City = model('City', CitySchema)