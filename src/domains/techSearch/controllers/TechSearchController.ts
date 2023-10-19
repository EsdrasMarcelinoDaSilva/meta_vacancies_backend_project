import * as yup from "yup"
import { ErrorMaker } from "../../../utils/ErrorMaker"
import { Request, Response as ExpressResponse } from "express"
import { StatusCode } from "../../../utils/status.code"
import { TechSearchService } from "../services/TechSearchService"

export class TechSearchController {
    constructor(private service: TechSearchService, private errorMaker: ErrorMaker){}

    async updateSearchCount(req: Request, res: ExpressResponse){
        const { body } = req

        const bodyValidation = yup.object().shape({
            technologyId: yup.string().notRequired(),
            cityId: yup.string().notRequired()
        })

        try{
            await bodyValidation.validate(body)
        }catch(error: any){
            return res.status(StatusCode.BAD_REQUEST)
            .json(this.errorMaker.makeError(error.errors, StatusCode.BAD_REQUEST))
        }

        const { technologyId, cityId } = body
            
        try{
            let techSearch = await this.service.update({technologyId, cityId})
            if(!techSearch){
                techSearch = await this.service.create(technologyId, cityId)
            }
            res.status(StatusCode.CREATED).json(techSearch)
        } catch(error: any){
            res.status(StatusCode.BAD_REQUEST)
            .json(this.errorMaker.makeError(error.errors, StatusCode.BAD_REQUEST))
        }
    }

    async getTopFiveTechnologies(_: Request, res: ExpressResponse) {
        try {
            const topFiveTechnologies = await this.service.getTopFiveTechnologies()
            res.status(StatusCode.OK).json(topFiveTechnologies)
        } catch (error: any) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .json(this.errorMaker.makeError(error.errors, StatusCode.INTERNAL_SERVER_ERROR))
        }
    }

    async getTopFiveCitiesForTopTechnology(req: Request , res: ExpressResponse) {
        try {
            const { technologyId } = req.params
            const topFiveCities = await this.service.getTopFiveCitiesForTopTechnology(technologyId)
            return res.status(StatusCode.OK).json(topFiveCities)
        } catch (error: any) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).send('deu ruim!')
            .json(this.errorMaker.makeError(error.errors, StatusCode.INTERNAL_SERVER_ERROR))
        }
    }
}









