import { Types } from "mongoose"
import { ErrorMaker } from "../../../utils/ErrorMaker"
import { StatusCode } from "../../../utils/status.code"
import { TechSearchRepository } from "../repositories/TechSearchRepository"
import { TechSearchType } from "../types/TechSearchType"

export class TechSearchService {
    constructor(
        private repository: TechSearchRepository, 
        private errorMaker: ErrorMaker
    ){}

    async update(techSearchData: TechSearchType) {
        try{
            const filter = { technologyId: techSearchData.technologyId, cityId: techSearchData.cityId }
            const update = { $inc: { count: 1 } }
            let techSearch = await this.repository.findOneAndUpdate(filter, update, { new: true })
            return techSearch
        } catch(error: any){
            return this.errorMaker.makeError(error.errors, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }

    async create(technologyId: Types.ObjectId, cityId: Types.ObjectId) {
        try{
            let techSearch = {
                technologyId: technologyId,
                cityId: cityId,
                count: 1
            }
            return await this.repository.save(techSearch)
        } catch(error: any){
            return this.errorMaker.makeError(error.errors, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }

    async getTopFiveTechnologies() {
        try{
            const topFiveTechnologies = await this.repository.getTopFiveTechnologies()
            return topFiveTechnologies
        } catch(error: any){
            return this.errorMaker.makeError(error.errors, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }

    async getTopFiveCitiesForTopTechnology(technologyId: string) {
        try{
            const topFiveCities = await this.repository.getTopFiveCitiesForTopTechnology()
            return topFiveCities
        } catch(error: any){
            return this.errorMaker.makeError(error.errors, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
}




