import { describe, expect, it, vi } from 'vitest'
import { JobService } from './JobService'
import { ErrorMaker } from '../../../utils/ErrorMaker'
import mongoose from 'mongoose'
import { JobType } from '../types/JobType'

const errorMaker = new ErrorMaker

const jobRepositoryMock = { 
    create: vi.fn(), get: vi.fn(), findById: vi.fn(), update: vi.fn(), delete: vi.fn()
} as any 

const cityRepositoryMock = { findByName: vi.fn(), create: vi.fn() } as any
const technologyRepositoryMock = { findByName: vi.fn(), create: vi.fn() } as any
const techSearchServiceMock = { update: vi.fn() } as any

const sut = new JobService(
    jobRepositoryMock, 
    cityRepositoryMock, 
    technologyRepositoryMock,  
    techSearchServiceMock,
    errorMaker
)

describe('JobService', () => {
    it('must be able to create a job', async () => {
        const paramsMock = {
            title: 'job1',
            jobDescription: 'description1',
            city: 'city1',
            technologies: ['tech1'],
            salary: 0,
            jobUrl: '',
            company: '',
            siteLink: '',
            user: new Object()
        } as any
        const expected = { 
            id: 1, title: 'job1', description: 'description1', city: 'city1', technologies: ['tech1']
        }

        vi.spyOn(cityRepositoryMock, 'findByName').mockResolvedValue(null)
        vi.spyOn(cityRepositoryMock, 'create').mockResolvedValue({ _id: 'city1' })
        vi.spyOn(technologyRepositoryMock, 'findByName').mockResolvedValue(null)
        vi.spyOn(technologyRepositoryMock, 'create').mockResolvedValue({ _id: 'tech1' })
        vi.spyOn(jobRepositoryMock, 'create').mockResolvedValue(expected)
        const result = await sut.create(paramsMock)

        expect(result).toStrictEqual(expected)
    })
    it('mut be able to get a job', async () => {
        const filtersMock = { title: 'job1' }
        const expected = [{
            title: 'job1', 
            description: 'description1', 
            city: 'city1', 
            technologies: ['tech1']
        }]

        vi.spyOn(jobRepositoryMock, 'get').mockResolvedValue(expected)
        
        const result = await sut.get(filtersMock)

        expect(result).toStrictEqual(expected)
    })
    it('must be to find a job by id', async () => {
        const idMock = new Object().toString()
        const expected = {
            title: 'job1', 
            description: 'description1', 
            city: 'city1', 
            technologies: ['tech1']
        }

        vi.spyOn(jobRepositoryMock, 'findById').mockResolvedValue(expected)

        const result = await sut.findById(idMock)

        expect(result).toStrictEqual(expected)
    })
    
    it('must be able to update a job', async () => {
        const idMock = new mongoose.Types.ObjectId()
        const userMock = new mongoose.Schema.Types.ObjectId(idMock.toHexString())
    
        const jobDataMock: JobType = {
            title: 'job2',
            jobDescription: 'description2',
            city: 'city2',
            technologies: ['tech2'],
            salary: 0,
            jobUrl: '',
            company: '',
            siteLink: '',
            user: userMock
        }
    
        const expected = { 
            title: 'job2', 
            description: 'description2', 
            city: 'city2', 
            technologies: ['tech2']
        }
    
        vi.spyOn(jobRepositoryMock, 'update').mockResolvedValue(expected)
    
        const result = await sut.update(idMock.toString(), jobDataMock)
    
        expect(result).toStrictEqual(expected)
    })

    it('must be able to delete a job', async () => {
        const idMock = new Object().toString()
        const expected = true

        vi.spyOn(jobRepositoryMock, 'delete').mockResolvedValue(expected)

        const result = await sut.delete(idMock)

        expect(result).toStrictEqual(expected)
    })
})