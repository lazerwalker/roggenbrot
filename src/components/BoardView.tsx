import * as React from 'react'
import TileView from './TileView';
import { Color, Piece } from '../Piece';

interface Props {
  size: number
}

const BoardView = (props: Props) => {
  const {size} = props

  const tiles = []
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      tiles.push(
        <TileView
          key={`${y}-${x}`}
          boardSize={size}
          x={x}
          y={y}
          piece={Piece.Rook}
          pieceColor={Color.White}
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

export default BoardView;