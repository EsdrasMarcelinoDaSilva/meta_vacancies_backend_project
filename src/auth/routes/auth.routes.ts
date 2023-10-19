import { Router } from "express"
import { AuthModule } from "../factories/AuthModule"
import { ErrorMaker } from "../../utils/ErrorMaker"

const errorMaker = new ErrorMaker

export const authRoutes = Router()
const { controller } = AuthModule.run(errorMaker)

authRoutes.post('/', controller.login.bind(controller))