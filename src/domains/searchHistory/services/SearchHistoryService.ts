import { ErrorMaker } from "../../../utils/ErrorMaker";
import { StatusCode } from "../../../utils/status.code";
import { SearchHistoryType } from "../types/SearchHistoryType";

export class SearchHistoryService {
    constructor(private repository: any, private errorMaker: ErrorMaker){}

    async create(data: SearchHistoryType){
        try{
            const searchHistory = await this.repository.create(data)
            return searchHistory
        } catch(error: any){
            return this.errorMaker.makeError('Error creating history', StatusCode.BAD_REQUEST)
        }
    
    }
    async get(userId: string){
        try{
            return await this.repository.get(userId)
        } catch(error: any){
            return this.errorMaker.makeError('Error getting job', StatusCode.BAD_REQUEST)
        }
    }
}