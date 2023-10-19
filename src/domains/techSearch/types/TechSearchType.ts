import { ObjectId, Types } from "mongoose"

export type TechSearchType = {
    _id?: Types.ObjectId
    technologyId: Types.ObjectId
    cityId: Types.ObjectId
    count?: number
}

