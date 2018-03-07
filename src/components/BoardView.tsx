import * as React from 'react'
import TileView from './TileView';
import * as _ from 'lodash';
import Piece, { Color, PieceType, xyToPos } from '../Piece';

interface Props {
  size: number
  pieces: Piece[]
}

interface DispatchProps {
  onDrag: (piece: Piece, pos: {x: number, y: number}) => void
}

export default (props: Props & DispatchProps) => {
  const {size, pieces, onDrag} = props

  const piecesByTile = _.keyBy(pieces, 'pos')

  const tiles = []

  for (var y = size - 1; y >= 0; y--) {
    for (var x = 0; x < size; x++) {
      const pos = xyToPos(x, y)
      const piece = piecesByTile[pos]
      let pieceType: PieceType|undefined
      let pieceColor: Color|undefined
      if (piece) {
        pieceType = piece.piece
        pieceColor = piece.color
      }

      tiles.push(
        <TileView
          key={pos}
          boardSize={size}
          pieceType={pieceType}
          pieceColor={pieceColor}
          pieces={pieces}
          x={x}
          y={y}
          onDrag={onDrag}
        />
      )
    }
  }
  return (
    <div id='board'>
      {tiles}
    </div>
  )
}