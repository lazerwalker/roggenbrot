import Piece, { PieceType } from "./Piece";
import { assertUnreachable } from "./helpers";
import * as _ from "lodash";

export default function moveIsValid(piece: Piece, to: {x: number, y: number}, board: Piece[]): boolean {
  // console.log("Checking validity", piece, position)
  const {x, y} = piece

  const xDiff = Math.abs(to.x - x)
  const yDiff = Math.abs(to.y - y)

  const isSelf = () => xDiff === 0 && yDiff === 0
  const isDiagonal = () => xDiff === yDiff
  const isLateral = () => xDiff === 0 || yDiff === 0
  const isSingleSpace = () => xDiff <= 1 && yDiff <= 1

  switch (piece.piece) {
    case PieceType.Pawn:
      if ((isLateral() && isSingleSpace()) || isSelf()) {
        return true
      } else if (isDiagonal() && isSingleSpace()) {
        const enemy = _.find(board, (p) => p.x === to.x && p.y === to.y)
        return enemy !== undefined
      } else {
        return false
      }
    case PieceType.Bishop:
      return isDiagonal()
    case PieceType.Rook:
      return isLateral()
    case PieceType.Knight:
      return (xDiff === 1 && yDiff === 2) ||
             (xDiff === 2 && yDiff === 1) ||
             isSelf()
    case PieceType.Queen:
      return isDiagonal() || isLateral()
    case PieceType.King:
      return isSingleSpace()
    default:
      assertUnreachable(piece.piece)
  }

  return false
}