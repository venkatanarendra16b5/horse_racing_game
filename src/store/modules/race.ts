import type { Module } from 'vuex'
import type { Horse, Round, RaceResult } from '../../types/race'
import { generateHorses } from '../../utils/horseGenerator'
import { generateSchedule } from '../../utils/scheduleGenerator'

export interface RaceState {
  horses: Horse[]
  schedule: Round[]
  currentRoundIndex: number
  raceResults: RaceResult[]
  isRacing: boolean
  isPaused: boolean
  horsesGenerated: boolean
  scheduleGenerated: boolean
}

const state: RaceState = {
  horses: [],
  schedule: [],
  currentRoundIndex: 0,
  raceResults: [],
  isRacing: false,
  isPaused: false,
  horsesGenerated: false,
  scheduleGenerated: false
}

export const race: Module<RaceState, any> = {
  namespaced: true,
  state,

  mutations: {
    // once the horses are generated, we can set the flag to true to enable schedule generation
    SET_HORSES_GENERATED(state, status: boolean) {
      state.horsesGenerated = status
    },
    // once the schedule is generated, we can set the flag to true to enable race start
    SET_SCHEDULE_GENERATED(state, status: boolean) {
      state.scheduleGenerated = status
    },
    // set the generated horses to the state
    SET_HORSES(state, horses: Horse[]) {
      state.horses = horses
    },
    // set the generated schedule to the state
    SET_SCHEDULE(state, schedule: Round[]) {
      state.schedule = schedule
    },
    // set the current round index to keep track of which round is currently running
    SET_CURRENT_ROUND(state, index: number) {
      state.currentRoundIndex = index
    },
    // add the result of each round to the race results array to keep track of the standings after each round
    ADD_RESULT(state, result: RaceResult) {
      state.raceResults.push(result)
    },
    // set the racing status to true when the race is ongoing and false when the race is finished or paused
    SET_RACING_STATUS(state, status: boolean) {
      state.isRacing = status
    },

    // set the paused status to true when the race is paused and false when the race is resumed
    SET_PAUSED_STATUS(state, status: boolean) {
      state.isPaused = status
    },
    // reset the race results and current round index to initial values when the race is restarted or when new horses are generated to ensure a fresh start for the new race
    RESET_RESULTS(state) {
      state.raceResults = []
      state.currentRoundIndex = 0
    }
  },

  actions: {
    // generate a new list of horses and reset all related states to prepare for a new race
    generateHorseList({ commit }) {
      const horses = generateHorses()

      commit('SET_HORSES', horses)
      commit('RESET_RESULTS')
      commit('SET_SCHEDULE', [])
      commit('SET_HORSES_GENERATED', true)
      commit('SET_SCHEDULE_GENERATED', false)
    },
    // generate the race schedule based on the generated horses
    generateRaceSchedule({ state, commit }) {
      if (!state.horses.length) return

      const schedule = generateSchedule(state.horses)

      commit('SET_SCHEDULE', schedule)
      commit('SET_SCHEDULE_GENERATED', true)
    },
    // start the race by running each round in the schedule sequentially and updating the race results after each round, also handle the racing and paused status to control the flow of the race
    async startRace({ state, commit, dispatch }) {
      if (!state.schedule.length || state.isRacing) return

      commit('SET_RACING_STATUS', true)
      commit('SET_PAUSED_STATUS', false)

      for (let i = 0; i < state.schedule.length; i++) {
        commit('SET_CURRENT_ROUND', i)

        const round = state.schedule[i]
        const result = await dispatch('runRound', round)

        commit('ADD_RESULT', result)
      }

      commit('SET_RACING_STATUS', false)
      commit('SET_PAUSED_STATUS', false)
      commit('SET_HORSES_GENERATED', false)
      commit('SET_SCHEDULE_GENERATED', false)
    },
    // pause the race by setting the paused status to true, this will allow the runRound action to skip updating horse positions and velocities while the race is paused, effectively freezing the race
    pauseRace({ commit }) {
      commit('SET_PAUSED_STATUS', true)
    },

    // resume the race by setting the paused status to false
    resumeRace({ commit }) {
      commit('SET_PAUSED_STATUS', false)
    },

    restartRace({ state, commit }) {
      // Reset all horses positions and states
      state.horses.forEach(horse => {
        horse.position = 0
        horse.velocity = 0
        horse.fatigue = 0
      })
      
      // Reset all race state to initial values
      commit('SET_CURRENT_ROUND', 0)
      commit('RESET_RESULTS')
      commit('SET_SCHEDULE', [])
      commit('SET_RACING_STATUS', false)
      commit('SET_PAUSED_STATUS', false)
      commit('SET_HORSES_GENERATED', false)
      commit('SET_SCHEDULE_GENERATED', false)
      commit('SET_HORSES', [])
    },

    runRound({ state }, round: Round): Promise<RaceResult> {
      return new Promise(resolve => {
        const participants = round.participants
        const finished: Horse[] = []

        const interval = setInterval(() => {
          // Skip if paused
          if (state.isPaused) return

          participants.forEach(horse => {
            if (finished.includes(horse)) return

            const baseAcceleration = (horse.condition / 100) * 0.8
            horse.fatigue += horse.velocity / round.distance

            const effectiveAcceleration =
              baseAcceleration * (1 - horse.fatigue)

            const randomFactor = 0.9 + Math.random() * 0.2

            horse.velocity += effectiveAcceleration
            horse.position += horse.velocity * randomFactor

            if (horse.position >= round.distance) {
              finished.push(horse)
            }
          })

          if (finished.length === participants.length) {
            clearInterval(interval)

            resolve({
              roundNumber: round.roundNumber,
              distance: round.distance,
              standings: finished
            })
          }
        }, 100)
      })
    }
  }
}
