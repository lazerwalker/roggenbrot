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
  pos: string
  x: number,
  y: number
}

/** The coordinate axis starts in the bottom-left.
 * To make things easier with chess coords
 * (so translation doesn't mean knowing the board size)
 */
export function posToXY(pos: string): {x: number, y: number} {
  const [x, y] = pos.split('')
  return {
    x: x.charCodeAt(0) - 'a'.charCodeAt(0),
    y: parseInt(y, 10) - 1 // 0 vs 1 index
  }
}

export function xyToPos(x: number, y: number): string {
  const letter = String.fromCharCode('a'.charCodeAt(0) + x)
  return `${letter}${y + 1}`
}