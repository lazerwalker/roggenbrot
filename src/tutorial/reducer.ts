import State, { GameMode } from "../state"
import { Action, ActionType } from "../action"
import changeMode from "../changeMode"
import animationTick from "../animationTick"

import TutorialContent from './content'
import { Color, PieceType } from "../Piece";

export default function(state: State, action: Action): State {
  if (action.type === ActionType.Move) {
    if (state.tutorialStep !== undefined) {
      const tutorialStep = state.tutorialStep + 1
      if (TutorialContent[tutorialStep]) {
        const content = TutorialContent[state.tutorialStep + 1]
        return {...state,
          board: {...state.board, pieces: content.pieces},
          tutorialStep
        }
      } else {
        const pieces = [
          {
            color: Color.White,
            piece: PieceType.King,
            x: 2,
            y: 0,
            pos: 'c1'
          }
        ]
        const newState = {
          ...state,
          board: {...state.board, pieces}
        }
        return changeMode(newState, GameMode.Game)
      }
    }
    return state
  } else if (action.type === ActionType.AnimationTick) {
    return animationTick(state)
  }
  return state
}