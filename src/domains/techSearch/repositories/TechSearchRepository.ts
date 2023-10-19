import { Model } from "mongoose"
import { ErrorMaker } from "../../../utils/ErrorMaker"
import { TechSearchType } from "../types/TechSearchType"

export class TechSeacherRepository {
    constructor(private model: Model<TechSearchType>, private errorMaker: ErrorMaker){}

    async findOne(technologyId: string, cityId: string){
        return this.model.findOne({ technologyId, cityId })
    }
    async save(techSearch: TechSearchType){
        if(techSearch._id){
            return this.model.findByIdAndUpdate(techSearch._id, techSearch, { new: true })
        } else {
            return new this.model(techSearch).save()
        }
    }
    async findOneAndUpdate(filter: object, update: object, options: object) { 
        return this.model.findOneAndUpdate(filter, update, options)
    }
    async find(filter: object) {
        return this.model.find(filter)
    }

    async getTopFiveTechnologies() {
        return this.model.find({}).sort({ count: -1 }).limit(5).populate('technologyId').exec()
    }

    async getTopFiveCitiesForTopTechnology() {
        const topTechnologies = await this.model.find().sort({ count: -1 }).limit(5).exec();
        if(topTechnologies.length > 0){
            return this.model.find({ technologyId: { $in: topTechnologies.map(tech => tech.technologyId) } })
                .sort({ count: -1 }).limit(5).populate('cityId').exec();
        }
    }
}
