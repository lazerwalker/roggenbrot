import { Color, PieceType } from "./Piece";

export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

export function asciiFromPiece(piece: PieceType, color: Color): string {
  switch (color) {
    case Color.White:
      switch (piece) {
        case PieceType.Bishop: return '♗'
        case PieceType.Knight: return '♘'
        case PieceType.Pawn: return '♙'
        case PieceType.Queen: return '♕'
        case PieceType.Rook: return '♖'
        case PieceType.King: return '♔'
        default: return assertUnreachable(piece)
      }
    case Color.Black:
      switch (piece) {
        case PieceType.Bishop: return '♝'
        case PieceType.Knight: return '♞'
        case PieceType.Pawn: return '♟'
        case PieceType.Queen: return '♛'
        case PieceType.Rook: return '♜'
        case PieceType.King: return '♚'
        default: return assertUnreachable(piece)
      }
    default:
      return assertUnreachable(color)
  }
}