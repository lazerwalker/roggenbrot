import State, { GameMode } from '../state'
import { newGameAction } from '../actionCreators';
import reducer from './reducer';
import * as random from '../random'
import { Color, PieceType } from '../Piece';

export default function(state?: State, seed?: string): State {
  seed = random.seedRNG(seed)

  const theState = state || {
    board: {
      size: 5,
      pieces: [{
        color: Color.White,
        piece: PieceType.King,
        x: 2,
        y: 0,
        pos: 'c1'
      }]
    }
  }

  const newState = {
    ...theState,

    score: 0,
    turnCount: 0,
    mode: GameMode.Game,

    animationSpeed: 300,
    isNewRound: false,
    gameIsOver: false,
    rngSeed: seed
  }

  window.location.hash = seed

  return reducer(newState, newGameAction())
}