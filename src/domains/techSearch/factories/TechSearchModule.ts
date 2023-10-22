import { TechSearch } from "../model/TechSearch"
import { TechSearchController } from "../controllers/TechSearchController"
import { TechSearchService } from "../services/TechSearchService"
import { TechSearchRepository } from "../repositories/TechSearchRepository"
import { ErrorMaker } from "../../../utils/ErrorMaker"

export class TechSearchModule {
    static run(errorMaker: ErrorMaker){
        const repository = new TechSearchRepository(TechSearch, errorMaker)
        const service = new TechSearchService(repository, errorMaker)
        const controller = new TechSearchController(service, errorMaker)
        return { repository, service, controller }
    }
}