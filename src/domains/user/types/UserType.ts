import { ObjectId } from "mongoose"

export type UserType = Document & {
    name: string
    email: string
    password: string
    favorites: ObjectId[]
}
