import Piece, { PieceType } from "./Piece";
import { assertUnreachable } from "./helpers";

export default function moveIsValid(piece: Piece, position: {x: number, y: number}, board: Piece[]): boolean {
  // console.log("Checking validity", piece, position)
  const {x, y} = piece

  const xDiff = Math.abs(position.x - x)
  const yDiff = Math.abs(position.y - y)

  const isSelf = () => xDiff === 0 && yDiff === 0
  const isDiagonal = () => xDiff === yDiff
  const isLateral = () => xDiff === 0 || yDiff === 0
  const isSingleSpace = () => xDiff <= 1 && yDiff <= 1

  switch (piece.piece) {
    case PieceType.Pawn:
      return (isLateral() && isSingleSpace()) || isSelf()
        // if (ENEMY_EXISTS && Math.abs(position.x - x) === 1 && Math.abs(position.y - y) === 1)
        // TODO: Pawn killing
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