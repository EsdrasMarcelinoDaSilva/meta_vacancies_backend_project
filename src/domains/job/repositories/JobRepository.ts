import { Model } from "mongoose";
import { JobType } from "../types/JobType";
import { ErrorMaker } from "../../../utils/ErrorMaker";
import { StatusCode } from "../../../utils/status.code";

export class JobRepository {
    constructor(private model: Model<JobType>, private errorMaker: ErrorMaker){}

    async create(data: JobType){
        try{
            return this.model.create(data)
        } catch(error: any){
            return this.errorMaker.makeError(error.message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
    async get(filters: JobType){

        let query = this.model.find()

        if('title' in filters){
            query.where('title').equals(filters.title)
        }
        
        if('salary' in filters){
            query.where('salary').equals(filters.salary)
        }

        if('city' in filters){
            query.where('city').equals(filters.city)
        }

        if('jobUrl' in filters){
            query.where('jobUrl').equals(filters.jobUrl)
        }

        if('technologies' in filters){
            query.where('technologies').in(filters.technologies)
        }

        if('company' in filters){
            query.where('company').equals(filters.company)
        }

        if('jobDescription' in filters){
            query.where('jobDescription').equals(filters.jobDescription)
        }

        if('siteLink' in filters){
            query.where('siteLink').equals(filters.siteLink)
        }

        try{
            return this.model.find(filters).populate('city')
        } catch(error: any){
            return this.errorMaker.makeError('Error finding jobs', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }

    async findById(id: string) {
        try {
            const job = await this.model.findById(id)
    
            if (!job) {
                return this.errorMaker.makeError('Job not found', StatusCode.NOT_FOUND)
            }
            return job
        } catch (error: any) {
            return this.errorMaker.makeError('Error finding job', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
    

    async update(id: string, jobData: JobType) {
        try {
            const updatedJob = await this.model.findByIdAndUpdate(id, jobData, { new: true })
    
            if (!updatedJob) {
                return this.errorMaker.makeError('Job not found', StatusCode.NOT_FOUND)
            }
            return updatedJob;
        } catch (error: any) {
            return this.errorMaker.makeError('Error updating job', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
    
    async delete(id: string){
        try{
            const result = await this.model.findByIdAndDelete(id)
            if(!result){
                return this.errorMaker.makeError('job not found', StatusCode.NOT_FOUND)
            }
            return result
        } catch(error: any){
            return this.errorMaker.makeError('Error deleting job', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
}