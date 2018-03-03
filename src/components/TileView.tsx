import * as React from 'react'
import { Color, Piece } from '../Piece';
import { assertUnreachable } from '../helpers';

interface Props {
  boardSize: number,
  piece?: Piece,
  pieceColor?: Color,
  x: number,
  y: number,
}

const TileView = (props: Props) => {
  const {boardSize, piece, pieceColor} = props

  // TODO: Would love if I could do this in pure CSS
  const percent = (1.0 / boardSize) * 100
  const style = {
    height: `${percent}%`,
    width: `${percent}%`,
  }

  let pieceChar = ""
  if (piece !== undefined && pieceColor !== undefined) {
    pieceChar = asciiFromPiece(piece, pieceColor)
  }

  return (
    <div className='tile' style={style}>{pieceChar}</div>
  )
}

function asciiFromPiece(piece: Piece, color: Color): string {
  switch (color) {
    case Color.White:
      switch (piece) {
        case Piece.Bishop: return '♗'
        case Piece.Knight: return '♘'
        case Piece.Pawn: return '♙'
        case Piece.Queen: return '♕'
        case Piece.Rook: return '♖'
        case Piece.King: return '♔'
        default: return assertUnreachable(piece)
      }
    case Color.Black:
      switch (piece) {
        case Piece.Bishop: return '♝'
        case Piece.Knight: return '♞'
        case Piece.Pawn: return '♟'
        case Piece.Queen: return '♛'
        case Piece.Rook: return '♜'
        case Piece.King: return '♚'
        default: return assertUnreachable(piece)
      }
    default:
      return assertUnreachable(color)
  }
}

export default TileView