import { Model } from "mongoose";
import { CityType } from "../types/CityType";
import { ErrorMaker } from "../../../utils/ErrorMaker";

export class CityRepository {
    constructor(private model: Model<CityType>, private errorMaker: ErrorMaker){}

    async create(data: { name: string }){
        return this.model.create(data)
    }

    async findByName(name: string){
        return this.model.findOne({ name: name })
    }

    async getByName(cityName: string){
        return this.model.findOne({ name: cityName })
    }
    async getById(id: number){
        return this.model.findOne({ id: id })
    }
    async getAll(){
        return this.model.find({})
    }
}