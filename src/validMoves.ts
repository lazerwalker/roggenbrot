import Piece, { PieceType, Position, Color } from "./Piece";
import { assertUnreachable } from "./helpers";
import { getPlayer, BoardState } from "./state";
import * as _ from "lodash";

export function validMoves(piece: Piece, board: BoardState): {x: number, y: number}[] {
  let result = []
  for (let y = board.size - 1; y >= 0; y--) {
    for (let x = 0; x < board.size; x++) {
      if (moveIsValid(piece, {x, y}, board)) {
        result.push({x, y})
      }
    }
  }

  return result
}

export function moveIsValid(piece: Piece, to: Position, board: BoardState): boolean {
  const {x, y} = piece

  enum Square {
    Empty = 0,
    Friend,
    Foe
  }

  const g: Square[][] = []
  for (let i = 0; i < board.size; i++) {
    const row = []
    for (let j = 0; j < board.size; j++) {
      row.push(Square.Empty)
    }
    g.push(row)
  }

  board.pieces.forEach((p) => {
    let px = (p.destination ? p.destination.x : p.x)
    let py = (p.destination ? p.destination.y : p.y)

    if (p.color === piece.color) {
      g[py][px] = Square.Friend
    } else {
      g[py][px] = Square.Foe
    }
  })
  function grid(pos: Position) {
    return g[pos.y][pos.x]
  }

  const xDiff = Math.abs(to.x - x)
  const yDiff = Math.abs(to.y - y)

  const isSelf = (xDiff === 0 && yDiff === 0)
  const isDiagonal = (xDiff === yDiff)
  const isLateral = (xDiff === 0 || yDiff === 0)
  const isSingleSpace = (xDiff <= 1 && yDiff <= 1)

  // TODO: There isn't as much test coverage for this or hasDiagonalLineOfSight as I'd like
  const hasLateralLineOfSight = () => {
    if (yDiff === 0) {
      for (let i = Math.min(piece.x, to.x) + 1; i <= Math.max(piece.x, to.x); i++) {
        if (i === piece.x || i === to.x) { continue }
        if (grid({x: i, y: piece.y}) !== Square.Empty) {
          return false
        }
      }
    } else if (xDiff === 0) {
      for (let i = Math.min(piece.y, to.y) + 1; i <= Math.max(piece.y, to.y); i++) {
        if (i === piece.y || i === to.y) { continue }
        if (grid({x: piece.x, y: i}) !== Square.Empty) {
          return false
        }
      }
    }
    return true
  }

  const hasDiagonalLineOfSight = () => {
    for (let i = Math.min(piece.y, to.y) + 1; i <= Math.max(piece.y, to.y); i++) {
      if (i === piece.y || i === to.y) { continue }

      for (let j = Math.min(piece.x, to.x) + 1; j <= Math.max(piece.x, to.x); j++) {
        if (j === piece.x || j === to.x) { continue }

        if (grid({x: j, y: i}) !== Square.Empty) {
          return false
        }
      }
    }
    return true
  }

  // Can't capture your own pieces
  if (!isSelf) {
    if (grid(to) === Square.Friend) {
      return false
    }
  }

  if (isSelf) { return true }

  switch (piece.piece) {
    case PieceType.Pawn:
      if (isLateral && isSingleSpace) {
        return grid(to) === Square.Empty
      } else if (isDiagonal && isSingleSpace) {
        return grid(to) !== Square.Empty
      } else {
        return false
      }
    case PieceType.Bishop:
      return isDiagonal && hasDiagonalLineOfSight()
    case PieceType.Rook:
      return isLateral && hasLateralLineOfSight()
    case PieceType.Knight:
      return (xDiff === 1 && yDiff === 2) ||
             (xDiff === 2 && yDiff === 1)
    case PieceType.Queen:
      return (isDiagonal && hasDiagonalLineOfSight())
        || (isLateral && hasLateralLineOfSight())
    case PieceType.King:
      return isSingleSpace
    default:
      assertUnreachable(piece.piece)
  }

  return false
}

export function playerCanMove(state: BoardState): boolean {
  const player = getPlayer(state)
  if (!player) { return false }

  // TODO: This is why I'd love some tests around this
  // (Was returning invalid boards because the only valid move was to stay still)
  const moves = validMoves(player, state).filter((m) => {
    return !(m.x === player.x && m.y === player.y)
  })

  const allPossibleEnemyMoves = _(state.pieces)
    .filter((p) => p.color === Color.Black)
    .map((p) => validMoves(p, state))
    .flatten()
    .uniq()
    .value()

  const nonLethalMoves = _.differenceWith(moves, allPossibleEnemyMoves, _.isEqual)

  return nonLethalMoves.length > 0
}