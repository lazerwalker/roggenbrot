import State from "./state";
import { Action, ActionType, MoveAction } from "./action";
import { Color } from './Piece';
import calculateEnemyMove from "./calculateEnemyMove";
import generateBoard from "./generateBoard";
import move from "./move";
import animationTick from "./animationTick";

export default function(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Move:
      const {piece, to} = (action as MoveAction).value
      if (piece.x === to.x && piece.y === to.y) {
        return state
      }

      let newState = move(state, piece, to)
      if (!newState.isNewRound) {
        for (var p of newState.pieces) {
          if (p.color === Color.White) { continue }
          const destination = calculateEnemyMove(newState, p)
          if (destination) {
            p.destination = destination
          }
        }
      }

      newState.isNewRound = false

      return newState
    case ActionType.NewGame:
      return generateBoard(state, false)
    case ActionType.AnimationTick:
      return animationTick(state)
    default:
      return state
  }
}