import { describe, expect, it, vi } from 'vitest'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { AuthService } from './AuthService'
import { UserRepository } from '../../domains/user/repositories/UserRepository' 
import { ErrorMaker } from '../../utils/ErrorMaker'

const errorMaker = new ErrorMaker

const userRepositoryMock = { findByEmail: vi.fn() } as unknown as UserRepository
const sut = new AuthService(userRepositoryMock, errorMaker)


describe('AuthService', () => {
    it('must be able to return an error if the email is not found', async () => {
        const paramsMock = { email: 'client@email.com', password: '0000' }
        vi.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(null)

        const result = await sut.login(paramsMock)
        const expected = {
            error: true,
            message: 'E-mail/password is invalid',
            status: 400
        }
        expect(result).toStrictEqual(expected)
    })
    it('must be able to return an error if the password is not invalid ', async () => {
        const paramsMock = { email: 'client@email.com', password: '0000' }
        const userMock = { name: 'client', _id: 1, password: '0000'}
        vi.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(userMock as  any)
        vi.spyOn(bcrypt, 'compareSync').mockReturnValue(false)

        const result = await sut.login(paramsMock)
        const expected = {
            error: true,
            message: 'E-mail/password is invalid',
            status: 400
        }
        expect(result).toStrictEqual(expected)
    })
    it('must be able to return the token and user', async () => {
        const paramsMock = { email: 'client@email.com', password: '0000' }
        const userMock = { name: 'client', _id: 1, email: 'client@email.com', password: '0000'}
        vi.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(userMock as  any)
        vi.spyOn(bcrypt, 'compareSync').mockReturnValue(true)
        vi.spyOn(JWT, 'sign').mockReturnValue('abcdef' as any)

        const result = await sut.login(paramsMock)

        const expected = { 
            token: 'abcdef',
            user: { id: 1, name: 'client', email: 'client@email.com'}
        }
        expect(result).toStrictEqual(expected)
    })
})
