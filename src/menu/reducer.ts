import State, { GameMode } from "../state";
import { Action, ActionType, MoveAction } from "../action";
import Piece, { PieceType, xyToPos } from "../Piece";
import changeMode from "../changeMode";
import * as _ from "lodash";

export default function(state: State, action: Action): State {
  if (action.type === ActionType.Move) {
    const {piece, to} = (action as MoveAction).value

    let pieces: Piece[] = _.filter(state.board.pieces, (p) => p.pos !== piece.pos)

    const capturedPiece = _.find(state.board.pieces, (p) => p.x === to.x && p.y === to.y)
    if (capturedPiece) {
      pieces = _.without(pieces, capturedPiece)
    }

    const newPiece = {...piece,
      x: to.x,
      y: to.y,
      pos: xyToPos(to.x, to.y),
      piece: (capturedPiece ? capturedPiece.piece : piece.piece)
    }

    pieces.push(newPiece)
    const newState = {...state, board: {...state.board, pieces}}

    if (capturedPiece && capturedPiece.piece === PieceType.King) {
        return changeMode(newState, GameMode.Game)
    }

    return newState
  }
  return state
}