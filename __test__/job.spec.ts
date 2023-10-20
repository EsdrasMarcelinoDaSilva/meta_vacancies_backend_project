import { path } from '../src/index'
import request from 'supertest'
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { Database } from '../src/database/Database'
import mongoose from 'mongoose' 

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


describe('Job Integration Test', () => {
    beforeEach(async () => {
        await Database.lift()
    })
    afterEach(async () => {
        await mongoose.connection.close()
    })

    it('should be able to create a job', async () => {
        const res = await request(path)
        .post('/job')
        .send(mockJob)

        if (res.statusCode === 201) {
            expect(res.body).toHaveProperty('id')
            expect(res.body.title).toEqual(mockJob.title)
            expect(res.body.salary).toEqual(mockJob.salary)
            expect(res.body.city).toEqual(mockJob.city)
            expect(res.body.jobUrl).toEqual(mockJob.jobUrl)
            expect(res.body.technologies).toEqual(mockJob.technologies)
            expect(res.body.company).toEqual(mockJob.company)
            expect(res.body.jobDescription).toEqual(mockJob.jobDescription)
            expect(res.body.siteLink).toEqual(mockJob.siteLink)
            expect(res.body.user).toEqual(mockJob.user)
        }
    })
})