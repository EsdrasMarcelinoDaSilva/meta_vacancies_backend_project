import { ErrorMaker } from "../../../utils/ErrorMaker"
import { StatusCode } from "../../../utils/status.code"
import { CityRepository } from "../../city/repositories/CityRepository"
import { TechnologyRepository } from "../../technology/repositories/TechnologyRepository"
import { TechSearchService } from "../../techSearch/services/TechSearchService"
import { TechSearchType } from "../../techSearch/types/TechSearchType"
import { JobRepository } from "../repositories/JobRepository"
import { JobType } from "../types/JobType"

export class JobService {
    constructor(
        private repository: JobRepository,
        private cityRepository: CityRepository,
        private technologyRepository: TechnologyRepository,
        private techSearchService: TechSearchService,
        private errorMaker: ErrorMaker
    ){}

    async create(data: JobType){

        const { city, technologies } = data

        let cityEntry = await this.cityRepository.findByName(city)
        if(!cityEntry){ 
            cityEntry = await this.cityRepository.create({ name: city })
        }

        const technologyEntries = await Promise.all(technologies.map(async (tech) => {
            let techEntry = await this.technologyRepository.findByName(tech)
            if(!techEntry){
                techEntry = await this.technologyRepository.create({  name: tech})
            }
            return techEntry
        }))

        const jobDataWithRefs = {
            ...data,
            city: cityEntry._id,
            technologies: technologyEntries.map((tech) => tech._id)
        }

        try{
            const job = await this.repository.create(jobDataWithRefs as unknown as JobType)
            return job
        } catch(error: any){
            return this.errorMaker.makeError('Error creating job', StatusCode.BAD_REQUEST)
        }
    }

    async get(filters: any){
        try{
            const jobs =  await this.repository.get(filters)
            if (filters.technologies) {
                for (const tech of filters.technologies) {
                    const techEntry = await this.technologyRepository.findByName(tech)
                    if (techEntry) {
                        const cityEntry = await this.cityRepository.findByName(filters.cityId)
                        if(cityEntry){
                            const techSearchData: TechSearchType = {
                                technologyId:techEntry._id,
                                cityId: cityEntry._id,
                                count: 1
                            }
                            await this.techSearchService.update(techSearchData)
                        }
                    }
                }
            }
            return jobs
        } catch(error: any){
            return this.errorMaker.makeError('Error search job', StatusCode.BAD_REQUEST)
        }
    }
    
    async findById(id: string) {
        try {
            const job = await this.repository.findById(id)
    
            if (!job) {
                return this.errorMaker.makeError('Job not found', StatusCode.NOT_FOUND)
            }
            return job
        } catch (error: any) {
            return this.errorMaker.makeError('Error finding job', StatusCode.BAD_REQUEST)
        }
    }
    
    async update(id: string, jobData: JobType) {
        try {
            const updatedJob = await this.repository.update(id, jobData);
    
            if (!updatedJob) {
                return this.errorMaker.makeError('Job not found', StatusCode.NOT_FOUND);
            }
            return updatedJob
        } catch (error: any) {
            return this.errorMaker.makeError('Error updating job', StatusCode.BAD_REQUEST);
        }
    }
    

    async delete(id: string ){
        try{
            const result = await this.repository.delete(id)
            if(!result){
                return this.errorMaker.makeError('Job not found', StatusCode.NOT_FOUND)
            }
            return result
        } catch(error: any){
            return this.errorMaker.makeError('Error deleting job', StatusCode.BAD_REQUEST)
            
        }
    }
}