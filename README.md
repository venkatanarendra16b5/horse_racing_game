# Horse Racing Game

A Vue 3 + TypeScript interactive horse racing simulation game built with Vite. Watch animated horses compete in a realistic race with varying conditions and performance factors.

## Features

- **Dynamic Horse Generation**: Randomly generates 1-20 horses with unique colors and fitness conditions
- **Race Simulation**: Runs multiple race rounds with realistic physics-based movement
- **Interactive Controls**: Start, pause, resume, and restart races with simple button controls
- **Live Animation**: Real-time animated horses moving across tracks with SVG icons
- **Race Results**: View detailed race results and programs in tabbed interface
- **Responsive UI**: Three-panel layout with horse list, race track, and results

## Game Components

### 1. **Header Controls**
   - **GENERATE HORSE LIST**: Creates 1-20 random horses with varying fitness conditions
   - **GENERATE PROGRAM**: Creates race schedule with multiple rounds
   - **START/PAUSE/RESUME**: Controls race execution
   - **RESTART**: Resets the entire game to initial state

### 2. **Left Panel - Horse List**
   Shows all generated horses with:
   - **Name**: Horse identifier (Horse 1, Horse 2, etc.)
   - **Condition**: Fitness level (1-100) - Higher is better
   - **Color**: Horse color displayed in the race

### 3. **Center Panel - Race Track**
   Displays active race with:
   - **Lane Numbers**: Green boxes (1-10) showing horse positions
   - **Horse Icons**: Animated SVG horses moving across the track
   - **Horse Names**: Names displayed on each racing horse
   - **Progress**: Real-time movement from start to finish

### 4. **Right Panel - Program & Results**
   Two tabs:
   - **Program**: View scheduled race order before racing
   - **Results**: View race results and final standings after each round

## How the Race Works

### Horse Statistics
- **Condition (1-100)**: Represents a horse's fitness
  - Higher condition → Better performance
  - Affects acceleration and fatigue accumulation
  
- **Position**: Current distance covered in the race
- **Velocity**: Current speed of the horse
- **Fatigue**: Accumulates during the race, reducing performance

### Race Physics
Each horse's movement is calculated based on:
1. **Base Acceleration** = (condition / 100) × 0.8
2. **Effective Acceleration** = Base Acceleration × (1 - fatigue)
3. **Random Factor** = 0.9 to 1.1 (adds unpredictability)
4. **Position Update** = velocity × random factor

This creates realistic races where:
- Horses with better condition start stronger
- Fatigue builds up as they race
- Random elements make each race unique

## Workflow

1. **Start Fresh**
   - Click "GENERATE HORSE LIST" to create random horses
   - View the horse list in the left panel

2. **Create Race Schedule**
   - Click "GENERATE PROGRAM" to schedule race rounds
   - View the program in the right panel

3. **Run the Race**
   - Click "START" to begin the race
   - Watch horses animate in real-time
   - Click "PAUSE" to pause, "RESUME" to continue

4. **View Results**
   - Switch to "Results" tab to see round winners
   - Click "RESTART" to reset and start over

## Technology Stack

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Vuex**: State management
- **Vite**: Fast build tool and development server

## Project Structure

```
src/
├── components/
│   ├── HorseTrack.vue      # Race track visualization
│   ├── HorseLane.vue       # Individual lane component
│   ├── RaceControls.vue    # Header buttons
│   └── RaceResults.vue     # Results display
├── store/
│   └── modules/
│       └── race.ts         # Vuex race state management
├── views/
│   └── RaceGame.vue        # Main game layout
├── types/
│   └── race.ts             # TypeScript interfaces
├── utils/
│   ├── horseGenerator.ts   # Generate horses
│   └── scheduleGenerator.ts # Generate race schedule
├── App.vue                 # Root component
└── main.ts                 # Entry point
```

## State Management (Vuex)

### Race State
```typescript
{
  horses: Horse[]              // All generated horses
  schedule: Round[]            // Scheduled race rounds
  currentRoundIndex: number    // Current active round
  raceResults: RaceResult[]    // Completed race results
  isRacing: boolean            // Race running status
  isPaused: boolean            // Race paused status
  horsesGenerated: boolean     // Horse generation status
  scheduleGenerated: boolean   // Schedule generation status
}
```

### Key Actions
- `generateHorseList`: Create random horses
- `generateRaceSchedule`: Schedule race rounds
- `startRace`: Begin race execution
- `pauseRace`: Pause active race
- `resumeRace`: Resume paused race
- `restartRace`: Reset to initial state

## Installation & Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

```

## Live Demo

1. Generate horses (1-20 random)
2. Generate program (creates race schedule)
3. Click Start and watch the race
4. Pause/Resume as needed
5. View results in Results tab
6. Restart to play again
