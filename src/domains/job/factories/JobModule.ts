import { Job } from '../model/Job'
import { JobController } from '../controllers/JobController'
import { JobService } from '../services/JobService'
import { JobRepository } from '../repositories/JobRepository'
import { ErrorMaker } from '../../../utils/ErrorMaker'
import { CityRepository } from '../../city/repositories/CityRepository'
import { TechnologyRepository } from '../../technology/repositories/TechnologyRepository'
import { Technology } from '../../technology/model/Technology'
import { City } from '../../city/model/City'

export class JobModule {
    static run(errorMaker: ErrorMaker){
        const repository = new JobRepository(Job, errorMaker)
        const cityRepository = new CityRepository(City, errorMaker)
        const technologyRepository = new TechnologyRepository(Technology)
        const service = new JobService(repository, cityRepository, technologyRepository, errorMaker)
        const controller = new JobController(service, errorMaker)
        return { repository, service, controller }
    }
}
