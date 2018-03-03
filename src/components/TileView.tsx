import * as React from 'react'
import { Color, PieceType } from '../Piece';
import { assertUnreachable } from '../helpers';

interface Props {
  boardSize: number,
  pieceType?: PieceType,
  pieceColor?: Color,
}

const TileView = (props: Props) => {
  const {boardSize, pieceType, pieceColor} = props

  // TODO: Would love if I could do this in pure CSS
  const percent = (1.0 / boardSize) * 100
  const style = {
    height: `${percent}%`,
    width: `${percent}%`,
  }

  let pieceChar = ""
  if (pieceType !== undefined && pieceColor !== undefined) {
    pieceChar = asciiFromPiece(pieceType, pieceColor)
    console.log("HAS PIECE", pieceChar)
  }

  return (
    <div className='tile' style={style}>{pieceChar}</div>
  )
}

function asciiFromPiece(piece: PieceType, color: Color): string {
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

export default TileView