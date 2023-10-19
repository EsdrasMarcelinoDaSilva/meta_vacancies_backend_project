import { Schema, model } from 'mongoose'
import { TechSearchType } from '../types/TechSearchType'

const TechSearchSchema = new Schema<TechSearchType>({
    technologyId: { type: Schema.Types.ObjectId, ref: 'Technology' },
    cityId: { type: Schema.Types.ObjectId, ref: 'City' },
    count: { type: Number, required: true }
}, { timestamps: true })

export const TechSearch = model('TechSearch', TechSearchSchema)
