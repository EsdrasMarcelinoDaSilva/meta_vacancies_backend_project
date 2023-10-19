import { describe, expect, it, vi } from "vitest"
import bcrypt from 'bcrypt' 
import { UserService } from './UserService'
import { ErrorMaker } from "../../../utils/ErrorMaker"

const errorMaker = new ErrorMaker

const repositoryMock = { findByEmail: vi.fn(), create: vi.fn()} as any 
const sut = new UserService(repositoryMock, errorMaker)

describe('UserService', () => {
    it('must be able to return an error if the user already exists', async () => {
        const paramsMock = { name: 'client', email: 'client@email.com', password: '0000' } as any
        vi.spyOn(repositoryMock, 'findByEmail')
        .mockResolvedValue({ name: 'client', email: 'client@email.com', password: '0000' })

        const result = await sut.create(paramsMock)

        expect(result).toStrictEqual({error: true, message: 'User already exists', status: 400})
    })
    it('must be able to create a user', async () => {
        const paramsMock = { name: 'client', email: 'client@email.com', password: '0000' } as any
        const expected = { id: 1, name: 'client', email: 'client@email.com', passwod: '0000' }

        vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(null)
        vi.spyOn(repositoryMock, 'create').mockResolvedValue(expected)
        vi.spyOn(bcrypt, 'hashSync').mockReturnValue('0000')

        const result = await sut.create(paramsMock)
        

        expect(result).toStrictEqual(expected)
    })
})