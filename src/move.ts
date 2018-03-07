import State from "./state";
import Piece, { xyToPos, PieceType } from "./Piece";
import generateBoard from "./generateBoard";
import * as _ from "lodash";

export default function move(state: State, piece: Piece, to: {x: number, y: number}): State {
  let newPieces: Piece[] = _.filter(state.pieces, (p) => p.pos !== piece.pos)

  const capturedPiece = _.find(state.pieces, (p) => p.x === to.x && p.y === to.y)
  if (capturedPiece) {
    newPieces = _.without(newPieces, capturedPiece)
  }

  const newPiece = {...piece,
    x: to.x,
    y: to.y,
    pos: xyToPos(to.x, to.y),
    piece: (capturedPiece ? capturedPiece.piece : piece.piece)
  }

  newPieces.push(newPiece)

  const newState = {...state, pieces: newPieces}

  if (capturedPiece && newPiece.piece === PieceType.King) {
    return generateBoard(newState)
  } else {
    return newState
  }
}