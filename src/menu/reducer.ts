import State, { GameMode } from "../state";
import { Action, ActionType, MoveAction } from "../action";
import { PieceType } from "../Piece";
import changeMode from "../changeMode";

export default function(state: State, action: Action): State {
  console.log(action)
  if (action.type === ActionType.Move) {
    console.log("Did a move!")
    const to = (action as MoveAction).value.to

    const piece = state.board.pieces.find((p) => p.x === to.x && p.y === to.y)

    console.log(piece)
    if (piece && piece.piece === PieceType.King) {
      console.log("Making a game")
      return changeMode(GameMode.Game)
    }
  }
  return state
}