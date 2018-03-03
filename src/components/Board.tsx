import * as React from 'react'
import { Tile } from './Tile';

interface Props {
  size: number
}

export const Board = (props: Props) => {
  const {size} = props

  const tiles = []
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      tiles.push(
        <Tile
          key={`${y}-${x}`}
          boardSize={size}
          x={x}
          y={y}
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