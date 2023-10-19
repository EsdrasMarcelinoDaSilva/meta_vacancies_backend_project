import * as yup from 'yup'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { ErrorMaker } from '../../../utils/ErrorMaker'
import { StatusCode } from '../../../utils/status.code'

export class UserController {
    constructor(private service: UserService, private errorMaker: ErrorMaker){}

    async create(req: Request, res: Response){
        const { body } = req

        const bodyValidation = yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup.string().email().required('email is required'),
            password: yup.string().required('Password is required'),
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
    async addFavorite(req: Request, res: Response){
        const { userId, jobId } = req.params
        const result = await this.service.addFavorite(userId, jobId)
        if(result && 'error' in result ){
            return res.status(result.status).json(result)
        }
        return res.status(StatusCode.OK).json(result)
    }
}
