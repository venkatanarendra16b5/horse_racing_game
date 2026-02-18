<template>
  <div class="results-container">
    <div v-if="!showResults" class="program-view">
      <h4>Race Program</h4>
      <div
        v-for="round in schedule"
        :key="round.roundNumber"
        class="round-section"
      >
        <div class="round-header">
          {{ round.roundNumber }} Lap - {{ round.distance }}m
        </div>
        <ol class="horses-list">
          <li
            v-for="horse in round.participants"
            :key="horse.id"
            class="horse-item"
          >
            <span class="position">{{ round.participants.indexOf(horse) + 1 }}</span>
            <span class="name">{{ horse.name }}</span>
          </li>
        </ol>
      </div>
    </div>

    <div v-else class="results-view">
      <h4>Race Results</h4>
      <div
        v-for="result in results"
        :key="result.roundNumber"
        class="round-section"
      >
        <div class="round-header">
          {{ result.roundNumber }} Lap - {{ result.distance }}m
        </div>
        <ol class="horses-list">
          <li
            v-for="(horse, idx) in result.standings"
            :key="horse.id"
            class="horse-item"
          >
            <span class="position">{{ idx + 1 }}</span>
            <span class="name">{{ horse.name }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { RaceState } from '../store/modules/race'

defineProps<{
  showResults: boolean
}>()

const store = useStore<{ race: RaceState }>()

const schedule = computed(() => store.state.race.schedule)
const results = computed(() => store.state.race.raceResults)
</script>

<style scoped>
.results-container {
  width: 100%;
  height: 100%;
  font-size: 11px;
}

.program-view,
.results-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

h4 {
  margin: 0 0 10px 0;
  font-size: 12px;
  background: #ddd;
  padding: 5px;
}

.round-section {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.round-header {
  background: #ff9999;
  color: white;
  padding: 5px;
  margin-bottom: 8px;
  font-size: 10px;
  font-weight: bold;
}

.horses-list {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.horse-item {
  display: flex;
  padding: 3px 0;
  border-bottom: 1px solid #f0f0f0;
}

.position {
  min-width: 20px;
  font-weight: bold;
}

.name {
  margin-left: 8px;
  flex: 1;
}
</style>
