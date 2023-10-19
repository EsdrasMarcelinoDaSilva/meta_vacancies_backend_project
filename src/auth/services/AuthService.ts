import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import { UserRepository } from "../../domains/user/repositories/UserRepository"
import { ErrorMaker } from "../../utils/ErrorMaker"
import { CreateUserDto } from "../dtos/CreateUserDto"
import { UserType } from "../../domains/user/types/UserType"
import { AuthType } from "../types/AuthType"
import { AuthMapper } from "../../utils/AuthMapper"
import { StatusCode } from "../../utils/status.code"

export class AuthService {
    constructor(private userRepository: UserRepository, private errorMaker: ErrorMaker){}

    async login(data: CreateUserDto){
        const user = await this.userRepository.findByEmail(data.email)
        if(!user){
            return this.errorMaker.makeError('E-mail/password is invalid', StatusCode.BAD_REQUEST)
        }

        const passwordIsValid = bcrypt.compareSync(data.password, (user as UserType).password)
        if(!passwordIsValid){
            return this.errorMaker.makeError('E-mail/password is invalid', StatusCode.BAD_REQUEST)
        }

        if((user as UserType).password){
            delete(user as any).password
        }

        const payload = { ...AuthMapper.typeAuth(user as unknown as AuthType) }
        const secretKey = process.env.JWT_KEY as string
        const option = { expiresIn: '10min'}

        const token = JWT.sign(payload, secretKey, option)
        return { token, user: AuthMapper.typeAuth(user as unknown as AuthType) }
    }
}