import State, { GameMode } from '../state'
import tutorial from './content'

export default function(): State {
  return {
    board: {
      size: 5,
      pieces: tutorial[0].pieces
    },
    score: 0,
    turnCount: 0,
    mode: GameMode.Tutorial,

    tutorialStep: 0,
    animationSpeed: 300,
  }
}