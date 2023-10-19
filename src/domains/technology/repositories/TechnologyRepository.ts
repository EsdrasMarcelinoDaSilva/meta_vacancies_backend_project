import { Model } from "mongoose"
import { TechnologyType } from "../types/TechnologyType";

export class TechnologyRepository {
    constructor(private model: Model<TechnologyType>){}

    async create(data: { name: string }){
        return this.model.create(data)
    }

    async findByName(name: string){
        return this.model.findOne({ name: name })
    }

    async getByName(name: string){
        return this.model.findOne({ name: name })
    }

    async getAll(){
        return this.model.find({})
    }
}
