import { Schema, model } from 'mongoose'

const SearchHistorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    technology: { type: Schema.Types.ObjectId, ref: 'Technology', required: true },
}, { timestamps: true })

export const SearchHistory = model('SearchHistory', SearchHistorySchema)

