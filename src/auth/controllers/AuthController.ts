import { Request, Response } from "express";
import * as yup from 'yup'
import { StatusCode } from "../../utils/status.code"
import { ErrorMaker } from "../../utils/ErrorMaker"
import { AuthService } from "../services/AuthService"


export class AuthController {
    constructor(private service: AuthService, private errorMaker: ErrorMaker){}

    async login(req: Request, res: Response){
        const { body } = req

        const bodyValidation = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        })
        try{
            await bodyValidation.validate(body)
        }catch(error: any){
            return res.status(StatusCode.BAD_REQUEST)
            .json(this.errorMaker.makeError(error.errors, StatusCode.BAD_REQUEST))
        }

        const result = await this.service.login(body)
        if('error' in result){
            return res.status(result.status).json(result)
        }
        return res.status(StatusCode.OK).json(result)
    }
}