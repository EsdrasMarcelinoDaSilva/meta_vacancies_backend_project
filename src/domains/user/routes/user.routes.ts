import { Router } from 'express'
import { UserModule } from '../factories/UserModule'
import { ErrorMaker } from '../../../utils/ErrorMaker'

const errorMaker = new ErrorMaker

export const userRoutes = Router()
const { controller } = UserModule.run(errorMaker)

userRoutes.post('/', controller.create.bind(controller))