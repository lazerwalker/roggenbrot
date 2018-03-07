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
        newState.pieces = newState.pieces.map((p) => {
          // TODO: This doesn't factor in destinations we've just locked in
          if (p.color === Color.White) { return p }
          const destination = calculateEnemyMove(newState, p)
          if (destination) {
            p.destination = destination
          }
          return p
        })
      }

      newState.isNewRound = false

      return newState
    case ActionType.NewGame:
      return generateBoard(state, false)
    case ActionType.AnimationTick:
      console.log("Animation tick!")
      return animationTick(state)
    default:
      return state
  }
}