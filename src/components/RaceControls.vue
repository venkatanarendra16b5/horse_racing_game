<template>
  <div class="header-controls">
    <button
      @click="generateHorseList"
      class="btn-primary"
      :disabled="raceState.isRacing"
    >
      GENERATE HORSE LIST
    </button>

    <button
      @click="generateProgram"
      class="btn-primary"
      :disabled="!raceState.horsesGenerated || raceState.isRacing"
    >
      GENERATE PROGRAM
    </button>

    <button
      @click="toggleRace"
      class="btn-primary"
      :disabled="!raceState.scheduleGenerated && !raceState.isRacing"
    >
      {{ !raceState.isRacing ? 'START' : raceState.isPaused ? 'RESUME' : 'PAUSE' }}
    </button>

    <button
      @click="restartRace"
      class="btn-primary"
      :disabled="!raceState.scheduleGenerated"
    >
      RESTART
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { RaceState } from '../store/modules/race'

const store = useStore<{ race: RaceState }>()

const raceState = computed(() => store.state.race)

const generateHorseList = () => {
  store.dispatch('race/generateHorseList')
}

const generateProgram = () => {
  store.dispatch('race/generateRaceSchedule')
}

const toggleRace = () => {
  if (!raceState.value.isRacing) {
    store.dispatch('race/startRace')
  } else if (raceState.value.isPaused) {
    store.dispatch('race/resumeRace')
  } else {
    store.dispatch('race/pauseRace')
  }
}

const restartRace = () => {
  store.dispatch('race/restartRace')
}
</script>

<style scoped>
.header-controls {
  display: flex;
  gap: 10px;
}

.btn-primary {
  padding: 10px 20px;
  background: white;
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #f0f0f0;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
