import { describe, expect, it, vi } from 'vitest'
import { TechSearchService } from './TechSearchService'
import { ErrorMaker } from '../../../utils/ErrorMaker'
import mongoose from 'mongoose'
import { TechSearchType } from '../types/TechSearchType'

const errorMaker = new ErrorMaker

const techSearchRepositoryMock = { 
    findOneAndUpdate: vi.fn(), save: vi.fn(), getTopFiveTechnologies: vi.fn(), getTopFiveCitiesForTopTechnology: vi.fn()
} as any 

const sut = new TechSearchService(
    techSearchRepositoryMock, 
    errorMaker
)

describe('TechSearchService', () => {
    it('must be able to update a tech search', async () => {
        const techSearchDataMock: TechSearchType = {
            technologyId: new mongoose.Types.ObjectId(),
            cityId: new mongoose.Types.ObjectId(),
            count: 1
        }
        const expected = { 
            technologyId: techSearchDataMock.technologyId, 
            cityId: techSearchDataMock.cityId, 
            count: 1
        }

        vi.spyOn(techSearchRepositoryMock, 'findOneAndUpdate').mockResolvedValue(expected)
    
        const result = await sut.update(techSearchDataMock)
    
        expect(result).toStrictEqual(expected)
    })

    it('must be able to create a tech search', async () => {
        const technologyId = new mongoose.Types.ObjectId()
        const cityId = new mongoose.Types.ObjectId()

        const techSearchDataMock = {
            technologyId: technologyId,
            cityId: cityId,
            count: 1
        }

        vi.spyOn(techSearchRepositoryMock, 'save').mockResolvedValue(techSearchDataMock)

        const result = await sut.create(technologyId, cityId)

        expect(result).toEqual(techSearchDataMock)
    })

    it('should get top five technologies', async () => {
        const topFiveTechnologies = [
            { technologyId: 'tech1', count: 100 },
            { technologyId: 'tech2', count: 90 },
            { technologyId: 'tech3', count: 80 },
            { technologyId: 'tech4', count: 70 },
            { technologyId: 'tech5', count: 60 }
        ]

        vi.spyOn(techSearchRepositoryMock, 'getTopFiveTechnologies').mockResolvedValue(topFiveTechnologies)

        const result = await sut.getTopFiveTechnologies()

        expect(result).toEqual(topFiveTechnologies)
    })

    it('should get top five cities for top technology', async () => {
        const topFiveCities = [
            { cityId: 'city1', count: 100 },
            { cityId: 'city2', count: 90 },
            { cityId: 'city3', count: 80 },
            { cityId: 'city4', count: 70 },
            { cityId: 'city5', count: 60 }
        ]

        vi.spyOn(techSearchRepositoryMock, 'getTopFiveCitiesForTopTechnology').mockResolvedValue(topFiveCities)

        const result = await sut.getTopFiveCitiesForTopTechnology('tech1')

        expect(result).toEqual(topFiveCities)
    })
})
