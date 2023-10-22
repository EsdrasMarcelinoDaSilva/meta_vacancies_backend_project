import express from 'express'
import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose' 
import { StatusCode } from '../src/utils/status.code'
import { routes } from '../routes'

const mockJob = {
    title: 'Desenvolvedor Full Stack',
    salary: 7000,
    city: 'São Paulo',
    jobUrl: 'https://www.exemplo.com',
    technologies: ['JavaScript', 'React', 'Node.js'],
    company: 'Empresa Exemplo',
    jobDescription: 'Esta é uma descrição do trabalho.',
    siteLink: 'https://www.exemplo.com',
    user: '60d21b7068bfd7a0f8e5c3f5' 
}

let mongoServer: MongoMemoryServer
let app = express()
app.use(express.json())
app.use(routes)

describe('Job Integration Test', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = await mongoServer.getUri()
        await mongoose.connect(mongoUri)
    })
    afterAll(async () => {
        await mongoose.connection.close()
        await mongoServer.stop()
    })

    it('should be able to create a job', async () => {
        const res = await request(app)
        .post('/job')
        .send(mockJob)

        console.log(res.body)

        if (res.statusCode === StatusCode.CREATED) {
            expect(res.body).toHaveProperty('_id')
            expect(res.body.title).toEqual(mockJob.title)
            expect(res.body.salary).toEqual(mockJob.salary)
            expect(res.body).toHaveProperty('city')
            expect(res.body.jobUrl).toEqual(mockJob.jobUrl)
            expect(Array.isArray(res.body.technologies)).toBe(true)
            expect(res.body.company).toEqual(mockJob.company)
            expect(res.body.jobDescription).toEqual(mockJob.jobDescription)
            expect(res.body.siteLink).toEqual(mockJob.siteLink)
            expect(res.body.user).toEqual(mockJob.user)
        }
    })
    it('show be able to get all jobs', async () => {
        const res = await request(app)
        .get('/job')

        expect(res.statusCode).toEqual(StatusCode.OK)
        expect(Array.isArray(res.body)).toBe(true)
    })
    it('show be able to get a job by id', async () => {
        const newJob = await request(app)
        .post('/job')
        .send(mockJob)

        const jobId = newJob.body._id

        const res = await request(app)
        .get(`/job/${jobId}`)

        expect(res.statusCode).toEqual(StatusCode.OK)
        expect(res.body).toHaveProperty('_id', jobId)
    })
    it('show be able to update a job', async () => {
        const newJob = await request(app)
        .post('/job')
        .send(mockJob)

        const jobId = newJob.body._id
        const updatedJob = { ...mockJob, title: 'New Title' }

        const res = await request(app)
        .put(`/job/${jobId}`)
        .send(updatedJob)

        expect(res.statusCode).toEqual(StatusCode.OK)
        expect(res.body).toHaveProperty('_id', jobId)
        expect(res.body.title).toEqual('New Title')
    })
    it('show be able to delete a job', async () => {
        const newJob = await request(app)
        .post('/job')
        .send(mockJob)

        const jobId = newJob.body._id
        const res = await request(app)
        .delete(`/job/${jobId}`)

        expect(res.statusCode).toEqual(StatusCode.NO_CONTENT)
    })
})
