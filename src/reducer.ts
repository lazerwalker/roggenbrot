import State from "./state";
import { Action, ActionType } from "./action";
import * as _ from "lodash";
import { xyToPos } from './Piece';

export default function(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Move:
      const {piece, to} = action.value

      const newPieces = _.filter(state.pieces, (p) => p.pos !== piece.pos)

      const capturedPiece = _.find(state.pieces, (p) => p.x === to.x && p.y === to.y)

      const newPiece = {...piece,
        x: to.x,
        y: to.y,
        pos: xyToPos(to.x, to.y),
        piece: (capturedPiece ? capturedPiece.piece : piece.piece)
      }

      newPieces.push(newPiece)

      return {...state, pieces: newPieces}
    default:
      return state
  }
}