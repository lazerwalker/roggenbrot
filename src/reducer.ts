import State from "./state";
import { Action, ActionType } from "./action";
import * as _ from "lodash";
import { Color } from './Piece';
import calculateEnemyMove from "./calculateEnemyMove";
import generateBoard from "./generateBoard";
import move from "./move";

export default function(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Move:
      if (action.value.piece.x === action.value.to.x && action.value.piece.y === action.value.to.y) {
        return state
      }

      let newState = move(state, action.value.piece, action.value.to)
      if (!newState.isNewRound) {
        const enemies = _.filter(newState.pieces, (p) => p.color === Color.Black)

        for (var e of enemies) {
          const to = calculateEnemyMove(newState, e)
          if (to) {
            // TODO: Check lose state
            newState = move(newState, e, to)
          }
        }
      }

      newState.isNewRound = false

      return newState
    case ActionType.NewGame:
      return generateBoard(state, false)
    default:
      return state
  }
}