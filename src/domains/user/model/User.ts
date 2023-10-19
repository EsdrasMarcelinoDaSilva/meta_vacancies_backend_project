import { Schema, model } from "mongoose"
import { UserType } from "../types/UserType"

const UserSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
}, { timestamps: true })

export const User = model('User', UserSchema)