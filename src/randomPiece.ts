import Piece, { Color, PieceType, xyToPos } from "./Piece";
import * as _ from "lodash";
import { sample } from "./random";

export default function randomPiece(color: Color, size: number, pieces: Piece[], forceKing: boolean = false): Piece {
  const allPositions = []
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      allPositions.push([i, j])
    }
  }

  const usedPositions = pieces.map((p) => [p.x, p.y])

  const positions = _.differenceWith(allPositions, usedPositions, _.isEqual)
  const [x, y] = sample(positions)!

  let pieceType: PieceType
  if (forceKing) {
    pieceType = PieceType.King
  } else {
    pieceType = sample([PieceType.Bishop, PieceType.Knight, PieceType.Pawn, PieceType.Queen, PieceType.Rook])
  }

  return {
    color,
    piece: pieceType,
    x,
    y,
    pos: xyToPos(x, y)
  }
}