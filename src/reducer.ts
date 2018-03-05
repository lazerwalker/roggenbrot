import State from "./state";
import { Action, ActionType } from "./action";
import * as _ from "lodash";
import Piece, { xyToPos, Color, PieceType } from './Piece';
import { validMoves } from "./validMoves";

export default function(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Move:
      let newState = move(state, action.value.piece, action.value.to)
      const enemies = _.filter(newState.pieces, (p) => p.color === Color.Black)

      for (var e of enemies) {
        newState = moveEnemy(newState, e)
      }

      return newState
    case ActionType.NewGame:
      const {size} = state
      const pieces = []
      pieces.push(randomPiece(Color.White, state.size, []))
      pieces.push(randomPiece(Color.Black, state.size, pieces, true))
      for (var i = 0; i < 4; i++) {
        pieces.push(randomPiece(Color.Black, state.size, pieces))
      }

      return {
        size,
        pieces
      }
    default:
      return state
  }
}

function randomPiece(color: Color, size: number, pieces: Piece[], forceKing: boolean = false): Piece {
  const allPositions = []
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      allPositions.push([i, j])
    }
  }

  const usedPositions = pieces.map((p) => [p.x, p.y])

  const positions = _.differenceWith(allPositions, usedPositions, _.isEqual)
  const [x, y] = _.sample(positions)!

  let pieceType: PieceType
  if (forceKing) {
    pieceType = PieceType.King
  } else {
    do {
      pieceType = _.sample(PieceType) as PieceType
    } while (pieceType === PieceType.King)
  }

  return {
    color,
    piece: pieceType,
    x,
    y,
    pos: xyToPos(x, y)
  }
}

function move(state: State, piece: Piece, to: {x: number, y: number}): State {
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

  return {...state, pieces: newPieces}
}

function moveEnemy(state: State, enemy: Piece): State {
  const possibleMoves = validMoves(enemy, state)
  const to = _.sample(possibleMoves)

  if (to) {
    return move(state, enemy, to)
  }

  return state
}