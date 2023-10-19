import { Request, Response } from "express";
import { ErrorMaker } from "../../../utils/ErrorMaker";
import * as yup from 'yup'
import { StatusCode } from "../../../utils/status.code";
import { SearchHistoryService } from "../services/SearchHistoryService";


export class SearchHistoryController {
    constructor(private service: SearchHistoryService , private errorMaker: ErrorMaker){}

    async create(req: Request, res: Response){
        const { body } = req

        const bodyValidation = yup.object().shape({
            user: yup.string().required('User is required'),
            city: yup.string().required('User is required'),
            technology: yup.string().required('Technology is required')
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
        try{
            const userId = req.params.userId
            const searchHistories = await this.service.get(userId)
            res.json(searchHistories)
        } catch(error: any){
            return res.status(StatusCode.BAD_REQUEST)
            .json(this.errorMaker.makeError(error.errors, StatusCode.BAD_REQUEST))
        }
    }
}