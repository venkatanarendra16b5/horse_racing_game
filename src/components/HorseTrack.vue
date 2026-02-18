<template>
  <div v-if="currentRound" class="track-container">
    <div class="round-title">
      {{ currentRound.roundNumber }} Lap - {{ currentRound.distance }}m
    </div>

    <div class="track-lanes">
      <div
        v-for="(horse, index) in currentRound.participants"
        :key="horse.id"
        class="lane"
      >
        <div class="lane-number">{{ index + 1 }}</div>
        <div class="lane-track">
          <div
            class="horse"
            :style="{ 
              left: getHorsePosition(horse)
            }"
            :title="horse.name"
          >
            <svg class="horse-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g :fill="horse.color">
                <!-- Body -->
                <ellipse cx="40" cy="60" rx="25" ry="20"/>
                <!-- Head -->
                <circle cx="65" cy="45" r="12"/>
                <!-- Neck -->
                <rect x="43" y="48" width="12" height="20" rx="6"/>
                <!-- Front legs (flipped) -->
                <rect x="36" y="75" width="6" height="20" rx="3"/>
                <rect x="46" y="75" width="6" height="20" rx="3"/>
                <!-- Back legs (flipped) -->
                <rect x="56" y="75" width="6" height="20" rx="3"/>
                <rect x="66" y="75" width="6" height="20" rx="3"/>
                <!-- Tail (flipped) -->
                <path d="M 15 55 Q 5 50 10 65" stroke="currentColor" stroke-width="4" fill="none"/>
                <!-- Ear (flipped) -->
                <polygon points="68,32 70,20 65,28"/>
              </g>
            </svg>
            <span class="horse-name">{{ horse.name }}</span>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { RaceState, Horse } from '../store/modules/race'

const store = useStore<{ race: RaceState }>()

const schedule = computed(() => store.state.race.schedule)
const index = computed(() => store.state.race.currentRoundIndex)

const currentRound = computed(() => schedule.value[index.value])

const getHorsePosition = (horse: Horse) => {
  if (!currentRound.value) return '0%'
  const percent = (horse.position / currentRound.value.distance) * 100
  return `calc(${Math.min(percent, 100)}% - 20px)`
}
</script>

<style scoped>
.track-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
}

.round-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  background: #f9f9f9;
  border-bottom: 2px solid #999;
}

.track-lanes {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.lane {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.lane-number {
  width: 30px;
  height: 30px;
  background: #90EE90;
  border: 2px solid #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.lane-track {
  flex: 1;
  height: 30px;
  background: #fff;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 2px;
  overflow: hidden;
}

.horse {
  width: 50px;
  height: 30px;
  position: absolute;
  transition: left 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1px solid #666;
  background: rgba(255, 255, 255, 0.9);
  flex-direction: column;
  gap: 2px;
}

.horse-icon {
  width: 24px;
  height: 24px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
}

.horse-name {
  font-size: 8px;
  color: #333;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 48px;
}

.finish-line {
  text-align: right;
  padding-right: 10px;
  font-weight: bold;
  color: #d9534f;
  font-size: 14px;
  padding: 10px;
}
</style>
