import { Router } from "express"
import { TechSearchModule } from "../factories/TechSearchModule"
import { ErrorMaker } from "../../../utils/ErrorMaker"

const errorMaker = new ErrorMaker

export const techSearchRoutes = Router()
const { controller } = TechSearchModule.run(errorMaker)


techSearchRoutes.post('/', controller.updateSearchCount.bind(controller))
techSearchRoutes.get('/technologies', controller.getTopFiveTechnologies.bind(controller))
techSearchRoutes.get('/cities/:technologyId',controller.getTopFiveCitiesForTopTechnology.bind(controller))