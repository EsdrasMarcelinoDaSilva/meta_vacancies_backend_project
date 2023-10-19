import { User } from '../model/User'
import { UserController } from '../controllers/UserController'
import { UserService } from '../services/UserService'
import { UserRepository } from '../repositories/UserRepository'
import { ErrorMaker } from '../../../utils/ErrorMaker'

export class UserModule {
    static run(errorMaker: ErrorMaker){
        const repository = new UserRepository(User, errorMaker)
        const service = new UserService(repository, errorMaker)
        const controller = new UserController(service, errorMaker)
        return { repository, service, controller }
    }
}