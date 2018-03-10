import State, { GameMode } from '../state'
import { newGameAction } from '../actionCreators';
import reducer from './reducer';

export default function(state: State): State {
  const newState = {
    ...state,

    score: 0,
    turnCount: 0,
    mode: GameMode.Game,

    animationSpeed: 300,
    isNewRound: false,
    gameIsOver: false
  }

  return reducer(newState, newGameAction())
}