import type { Horse, Round } from '../types/race'

const DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

export const generateSchedule = (horses: Horse[]): Round[] => {
  return DISTANCES.map((distance, index) => {
    const shuffled = [...horses].sort(() => Math.random() - 0.5)

    return {
      roundNumber: index + 1,
      distance,
      participants: shuffled.slice(0, 10).map(h => ({
        ...h,
        position: 0,
        velocity: 0,
        fatigue: 0
      }))
    }
  })
}
