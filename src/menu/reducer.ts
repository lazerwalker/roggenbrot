import State, { GameMode, getPlayer } from "../state";
import { Action, ActionType, MoveAction } from "../action";
import { PieceType, xyToPos } from "../Piece";
import changeMode from "../changeMode";

export default function(state: State, action: Action): State {
  if (action.type === ActionType.Move) {
    const to = (action as MoveAction).value.to

    const piece = state.board.pieces.find((p) => p.x === to.x && p.y === to.y)

    if (piece && piece.piece === PieceType.King) {
      const player = getPlayer(state.board)
      if (player) {
        const newPlayer = {
          ...player,
          x: to.x,
          y: to.y,
          pos: xyToPos(to.x, to.y),
          piece: PieceType.King
        }
        const pieces = [newPlayer]
        const newState = {...state, board: {...state.board, pieces}}
        return changeMode(newState, GameMode.Game)
      }
      return state
    }
  }
  return state
}