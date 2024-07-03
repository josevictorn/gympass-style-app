import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -5.9834368,
      longitude: -35.5762176,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -5.8763811,
      longitude: -35.3856735,
    })

    const { gyms } = await sut.execute({
      userLatitude: -5.9834368,
      userLongitude: -35.5762176,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
