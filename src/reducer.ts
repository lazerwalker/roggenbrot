import State from "./state";
import { Action, ActionType } from "./action";
import * as _ from "lodash";
import Piece, { xyToPos, Color, PieceType, Position } from './Piece';
import { validMoves } from "./validMoves";

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

function generateBoard(state: State, triggerNewRound: boolean = true): State {
  const {size} = state

  const pieces = []

  if (state.pieces.length > 0) {
    const player = state.pieces.find((p) => p.color === Color.White)
    if (player) {
      pieces.push(player)
    } else {
      pieces.push(randomPiece(Color.White, state.size, []))
    }
  } else {
    pieces.push(randomPiece(Color.White, state.size, []))
  }

  pieces.push(randomPiece(Color.Black, state.size, pieces, true))
  for (var i = 0; i < 4; i++) {
    pieces.push(randomPiece(Color.Black, state.size, pieces))
  }

  return {
    size,
    pieces,
    isNewRound: triggerNewRound
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

  const newState = {...state, pieces: newPieces}

  if (capturedPiece && newPiece.piece === PieceType.King) {
    return generateBoard(newState)
  } else {
    return newState
  }
}

function calculateEnemyMove(state: State, enemy: Piece): Position|undefined {
  const possibleMoves = validMoves(enemy, state)
  const player = state.pieces.find((p) => p.color === Color.White)
  if (!player) { return }

  const sorted = _.sortBy(possibleMoves, (pos) => {
    return Math.abs(pos.x - player.x) + Math.abs(pos.y - player.y)
  })

  return sorted[0]
}