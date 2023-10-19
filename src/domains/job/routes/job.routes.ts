import { Router } from "express"
import { JobModule } from "../factories/JobModule"
import { ErrorMaker } from "../../../utils/ErrorMaker"

const errorMaker = new ErrorMaker

export const jobRoutes = Router()
const { controller } = JobModule.run(errorMaker)

jobRoutes.post('/', controller.create.bind(controller))
jobRoutes.get('/', controller.get.bind(controller))
jobRoutes.get('/:id', controller.get.bind(controller))
jobRoutes.put('/:id', controller.update.bind(controller))
jobRoutes.delete('/:id', controller.delete.bind(controller))
