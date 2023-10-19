import { ObjectId } from "mongoose"

export type SearchHistoryType = {
    user: ObjectId
    city: ObjectId
    technology: ObjectId
}