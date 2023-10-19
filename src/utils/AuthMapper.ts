import { AuthType } from "../auth/types/AuthType";

export class AuthMapper {
    static typeAuth(user: AuthType){
        return {
            id: user._id,
            email: user.email,
            name: user.name
        }
    }
} 