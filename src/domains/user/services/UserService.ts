import bcrypt from 'bcrypt'
import { ErrorMaker } from '../../../utils/ErrorMaker'
import { UserRepository } from '../repositories/UserRepository'
import { StatusCode } from '../../../utils/status.code'
import { UserType } from '../types/UserType'
import { ObjectId } from 'mongoose'


export class UserService {
    constructor(private repository: UserRepository, private errorMaker: ErrorMaker){}

    async create(data: UserType){
        if(await this.repository.findByEmail(data.email)){
            return this.errorMaker.makeError('User already exists', StatusCode.BAD_REQUEST)
        }
        const userToRegister = {
            ...data,
            password: bcrypt.hashSync(data.password, 8)
        }
        return this.repository.create(userToRegister)
    }
    async addFavorite(userId: string, jobId: string){
        const user = await this.repository.findById(userId)
        if(!user || 'error' in user){
            return this.errorMaker.makeError('User not found', StatusCode.NOT_FOUND)
        }
        if(user.favorites.includes(jobId as unknown as ObjectId)){
            return this.errorMaker.makeError('Job already favorited', StatusCode.BAD_REQUEST)
        }
        user.favorites.push(jobId as unknown as ObjectId)
        return this.repository.update(userId, user)
    }
}
