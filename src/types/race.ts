export interface Horse {
  id: number
  name: string
  color: string
  condition: number
  position: number
  velocity: number
  fatigue: number
}

export interface Round {
  roundNumber: number
  distance: number
  participants: Horse[]
}

export interface RaceResult {
  roundNumber: number
  distance: number
  standings: Horse[]
}
