import State from "./state";
import Piece, { xyToPos, PieceType } from "./Piece";
import generateBoard from "./generateBoard";
import * as _ from "lodash";

export default function move(state: State, piece: Piece, to: {x: number, y: number}): State {
  let newPieces: Piece[] = _.filter(state.board.pieces, (p) => p.pos !== piece.pos)

  const capturedPiece = _.find(state.board.pieces, (p) => p.x === to.x && p.y === to.y)
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
  const board = {...state.board, pieces: newPieces}

  const newState = {
    ...state,
    board,
    turnCount: state.turnCount + 1
  }

  if (capturedPiece) {
    if (newPiece.piece === PieceType.King) {
      let kingPoints = 5
      if (state.turnCount > 5) {
        kingPoints = Math.max(10 - state.turnCount, 1)
      }

      return {
        ...generateBoard(newState),
        score: newState.score + kingPoints
      }
    } else {
      return {...newState,
        score: newState.score + 1
      }
    }
  } else {
    return newState
  }
}