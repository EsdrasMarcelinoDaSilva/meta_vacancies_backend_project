import { Model } from "mongoose";
import { UserType } from "../types/UserType";
import { ErrorMaker } from "../../../utils/ErrorMaker";
import { StatusCode } from "../../../utils/status.code"

export class UserRepository {
    constructor(private model: Model<UserType>, private errorMaker: ErrorMaker){}

    async findByEmail(email: string){
        try{
            return this.model.findOne({ email }).select('+password')
        } catch(error: any){
            return this.errorMaker.makeError(error.message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
    async findById(userId: string){
        try{
            return this.model.findById(userId)
        } catch(error: any){
            return this.errorMaker.makeError(error.message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
    async create(data: UserType){
        try{
            return this.model.create(data)
        }catch(error: any){
            return this.errorMaker.makeError(error.message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
    async update(userId: string, data: UserType){
        try{
            return this.model.findByIdAndUpdate(userId, data, { new: true })
        } catch(error: any){
            return this.errorMaker.makeError(error.message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
}