import Piece, { PieceType } from "./Piece";
import { assertUnreachable } from "./helpers";
import * as _ from "lodash";

export default function moveIsValid(piece: Piece, to: {x: number, y: number}, board: Piece[]): boolean {
  const {x, y} = piece

  const xDiff = Math.abs(to.x - x)
  const yDiff = Math.abs(to.y - y)

  const isSelf = (xDiff === 0 && yDiff === 0)
  const isDiagonal = (xDiff === yDiff)
  const isLateral = (xDiff === 0 || yDiff === 0)
  const isSingleSpace = (xDiff <= 1 && yDiff <= 1)

  // Can't capture your own pieces
  if (!isSelf) {
    const friendlyPiece = _.find(board, (p) => {
      return p.x === to.x
        && p.y === to.y
        && p.color === piece.color
    })

    if (!_.isUndefined(friendlyPiece)) {
      return false
    }
  }

  const enemy = _.find(board, (p) => {
    return p.x === to.x
      && p.y === to.y
      && p.color !== piece.color
  })

  if (isSelf) { return true }

  switch (piece.piece) {
    case PieceType.Pawn:
      if (isLateral && isSingleSpace) {
        return _.isUndefined(enemy)
      } else if (isDiagonal && isSingleSpace) {
        return !_.isUndefined(enemy)
      } else {
        return false
      }
    case PieceType.Bishop:
      return isDiagonal
    case PieceType.Rook:
      return isLateral
    case PieceType.Knight:
      return (xDiff === 1 && yDiff === 2) ||
             (xDiff === 2 && yDiff === 1)
    case PieceType.Queen:
      return isDiagonal || isLateral
    case PieceType.King:
      return isSingleSpace
    default:
      assertUnreachable(piece.piece)
  }

  return false
}