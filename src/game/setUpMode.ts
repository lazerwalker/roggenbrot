import State, { GameMode } from '../state'
import { newGameAction } from '../actionCreators';
import reducer from './reducer';

export default function(): State {
  const state = {
    board: {
      size: 5,
      pieces: [],
    },
    score: 0,
    turnCount: 0,
    mode: GameMode.Game,

    animationSpeed: 300,
    isNewRound: false
  }

  return reducer(state, newGameAction())
}