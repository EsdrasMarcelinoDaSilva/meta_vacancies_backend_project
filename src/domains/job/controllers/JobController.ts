import * as yup from 'yup'
import { Request, Response } from "express"
import { ErrorMaker } from "../../../utils/ErrorMaker"
import { StatusCode } from '../../../utils/status.code'
import { JobService } from '../services/JobService'

export class JobController {
    constructor(private service: JobService, private errorMaker: ErrorMaker){}

    async create(req: Request, res: Response){

        const { body } = req

        const bodyValidation = yup.object().shape({
            title: yup.string().required('Title is required'),
            salary: yup.number().required('Salary is required'),
            city: yup.string().required('City is required'),
            jobUrl: yup.string().url().required('Job URL is required'),
            technologies: yup.array(yup.string()).required('Technologies are required'),
            company: yup.string().required('Company is required'),
            jobDescription: yup.string().required('Job description is required'),
            siteLink: yup.string().url().required('Site link is required'),
            user: yup.string().required('User is required')
        })
        
        try{
            await bodyValidation.validate(body)
        }catch(error: any){
            return res.status(StatusCode.BAD_REQUEST)
            .json(this.errorMaker.makeError(error.errors, StatusCode.BAD_REQUEST))
        }

        const result = await this.service.create(body)
        if('error' in result){
            return res.status(result.status).json(result)
        }
        return res.status(StatusCode.CREATED).json(result)
    }
    
    async get(req: Request, res: Response){
        const filters = req.query

        try{
            const jobs = await this.service.get(filters)
            return res.status(StatusCode.OK).json(jobs)
        } catch(error: any){
            return res.status(StatusCode.BAD_REQUEST)
            .json(this.errorMaker.makeError(error.errors, StatusCode.BAD_REQUEST))
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const job = await this.service.findById(id)
            if (!job) {
                return res.status(StatusCode.NOT_FOUND)
                .json(this.errorMaker.makeError('Job not found', StatusCode.NOT_FOUND))
            }
            res.send(job)
        } catch (error) {
            res.status(500).send({ error: 'Server error' })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const jobData = req.body
    
        try {
            const existingJob = await this.service.findById(id)
    
            if (!existingJob) {
                return res.status(StatusCode.NOT_FOUND)
                .json(this.errorMaker.makeError('Job not found', StatusCode.NOT_FOUND))
            }
    
            const updatedJob = await this.service.update(id, jobData)
            return res.status(StatusCode.OK).json(updatedJob)
        } catch (error: any) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .json(this.errorMaker.makeError('Error updating job', StatusCode.INTERNAL_SERVER_ERROR))
        }
    }
    
    async delete(req: Request, res: Response){
        const { id } = req.params

        try{
            const result = await this.service.delete(id)
            if('error' in result){
                return res.status(result.status).json(result)
            }
            return res.status(StatusCode.NO_CONTENT).send()
        } catch(error: any){
            return res.status(StatusCode.BAD_REQUEST)
            .json(this.errorMaker.makeError(error.erros, StatusCode.BAD_REQUEST))
        }
    }
}