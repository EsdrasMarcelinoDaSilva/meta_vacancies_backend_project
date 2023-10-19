import { UserType } from "../../domains/user/types/UserType"

export type AuthType = UserType & { _id: string}