import { path } from '../src/index'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Database } from "../src/database/Database"
import mongoose from 'mongoose'

const user = { name: 'client', email: 'client@email.com', password: '0000' }

describe('User Integration Test', () => {
    beforeEach(async () => {
        await Database.lift()
    })
    afterEach(async () => {
        await mongoose.connection.close()
    })

    it('should be able to create a user', async () => {

        const res = await request(path)
            .post('/users')
            .send(user)

            if (res.statusCode === 201) {
                expect(res.body).toHaveProperty('id')
                expect(res.body.name).toEqual(user.name)
                expect(res.body.email).toEqual(user.email)
            }
    })

    it('should not be able to create a user with an email that already exists', async () => {
        
        await request(path)
            .post('/users')
            .send(user)

            const res = await request(path)
            .post('/users')
            .send(user)

            if (res.statusCode === 400) {
                expect(res.body).toHaveProperty('error')
            }
    })

})