export enum PieceType {
  Pawn,
  Knight,
  Bishop,
  Queen,
  King,
  Rook
}

export enum Color {
  Black,
  White
}

export default interface Piece {
  piece: PieceType,
  color: Color,
  x: string,
  y: number
}