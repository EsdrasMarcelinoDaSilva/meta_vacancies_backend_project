import { Model } from 'mongoose'
import { ErrorMaker } from '../../../utils/ErrorMaker'
import { SearchHistoryType } from '../types/SearchHistoryType'
import { StatusCode } from '../../../utils/status.code'


export class SearchHistoryRepository {
    constructor(private model: Model<SearchHistoryType>, private errorMaker: ErrorMaker){}

    async create(data: SearchHistoryType){
        try{
            return this.model.create(data)
        } catch(error: any){
            return this.errorMaker.makeError(error.message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
    async get(userId: string){
        return this.model.find({ user: userId }).populate('city technology')
    }
}