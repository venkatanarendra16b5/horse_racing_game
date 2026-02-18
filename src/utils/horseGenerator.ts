import type { Horse } from '../types/race'

export const generateHorses = (): Horse[] => {
  const horses: Horse[] = []
  const colors: string[] = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan',
    'magenta', 'lime', 'teal', 'indigo', 'violet', 'brown', 'gray',
    'black', 'white', 'gold', 'silver', 'bronze'
  ]
  for (let i = 1; i <= 20; i++) {
    horses.push({
      id: i,
      name: `Horse ${i}`,
      color: colors[i - 1] || 'black',
      condition: Math.floor(Math.random() * 100) + 1, // Random condition between 1 and 100 to know the fitness of the horse
      position: 0,
      velocity: 0,
      fatigue: 0
    })
  }

  return horses
}
