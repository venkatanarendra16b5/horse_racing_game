<template>
  <div class="race-game">
    <!-- Header -->
    <div class="header">
      <h1>Horse Racing</h1>
      <RaceControls />
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left: Horse List -->
      <div class="horse-list-panel">
        <h3>Horse List (1- {{ horses.length }})</h3>
        <table class="horse-table">
          <thead>
            <tr class="table-header">
              <th class="th-name">Name</th>
              <th class="th-condition">Condition</th>
              <th class="th-color">Color</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="horse in horses" :key="horse.id" class="table-row">
              <td class="td-name">{{ horse.name }}</td>
              <td class="td-condition">{{ horse.condition }}</td>
              <td class="td-color">
                <span class="color-badge" :style="{ backgroundColor: horse.color }"></span>
                {{ horse.color }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Center: Race Track -->
      <div class="track-panel">
        <HorseTrack />
      </div>

      <!-- Right: Tabs (Program & Results) -->
      <div class="results-panel">
        <div class="tabs">
          <button 
            @click="activeTab = 'program'" 
            :class="['tab-btn', { active: activeTab === 'program' }]"
          >
            Program
          </button>
          <button 
            @click="activeTab = 'results'" 
            :class="['tab-btn', { active: activeTab === 'results' }]"
          >
            Results
          </button>
        </div>

        <div v-if="activeTab === 'program'" class="tab-content">
          <RaceResults :showResults="false" />
        </div>
        <div v-if="activeTab === 'results'" class="tab-content">
          <RaceResults :showResults="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import RaceControls from '../components/RaceControls.vue'
import HorseTrack from '../components/HorseTrack.vue'
import RaceResults from '../components/RaceResults.vue'
import type { RaceState } from '../store/modules/race'

const store = useStore<{ race: RaceState }>()
const activeTab = ref('program')

const horses = computed(() => store.state.race.horses)
</script>

<style scoped>
.race-game {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #d9534f;
  color: white;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.main-content {
  display: flex;
  gap: 15px;
  padding: 15px;
  flex: 1;
  overflow: hidden;
}

.horse-list-panel {
  width: 220px;
  background: white;
  border: 2px solid #999;
  border-radius: 4px;
  padding: 10px;
  overflow-y: auto;
}

.horse-list-panel h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  background: #ffff99;
  padding: 5px;
  text-align: center;
}

.horse-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.horse-table .table-header {
  background: #ddd;
  border-bottom: 2px solid #999;
}

.horse-table th {
  padding: 5px 3px;
  text-align: left;
  font-weight: bold;
  border-right: 1px solid #999;
}

.horse-table th:last-child {
  border-right: none;
}

.th-name {
  width: 50%;
}

.th-condition {
  width: 25%;
}

.th-color {
  width: 25%;
}

.horse-table .table-row {
  border-bottom: 1px solid #ddd;
}

.horse-table .table-row:hover {
  background: #f9f9f9;
}

.horse-table td {
  padding: 3px 3px;
  border-right: 1px solid #f0f0f0;
}

.horse-table td:last-child {
  border-right: none;
}

.td-name {
  font-weight: 500;
}

.td-condition {
  text-align: center;
}

.td-color {
  display: flex;
  align-items: center;
  gap: 3px;
}

.color-badge {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #999;
  flex-shrink: 0;
}

.track-panel {
  flex: 1;
  background: white;
  border: 2px solid #999;
  border-radius: 4px;
  padding: 15px;
  overflow-y: auto;
}

.results-panel {
  width: 280px;
  background: white;
  border: 2px solid #999;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.tab-btn {
  flex: 1;
  padding: 10px;
  background: #ddd;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  border-right: 1px solid #999;
}

.tab-btn:last-child {
  border-right: none;
}

.tab-btn.active {
  background: #4CAF50;
  color: white;
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  font-size: 12px;
}
</style>
