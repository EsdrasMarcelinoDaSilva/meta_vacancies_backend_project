import { UserModule } from "../../domains/user/factories/UserModule"
import { ErrorMaker } from "../../utils/ErrorMaker"
import { AuthController } from "../controllers/AuthController"
import { AuthService } from "../services/AuthService"

export class AuthModule {
    static run(errorMaker: ErrorMaker){
        const { repository } = UserModule.run(errorMaker)
        const service = new AuthService(repository, errorMaker)
        const controller = new AuthController(service, errorMaker)
        return { service, controller }
    }
}