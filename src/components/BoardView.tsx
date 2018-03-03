import * as React from 'react'
import TileView from './TileView';
import State from '../state';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Piece, { Color, PieceType } from '../Piece';

interface Props {
  size: number
  pieces: Piece[]
}

const BoardView = (props: Props) => {
  const {size, pieces} = props

  const piecesByTile = _.keyBy(pieces, (piece: Piece) => {
    return `${piece.x}${piece.y}`
  })
  console.log(piecesByTile)

  const tiles = []
  const startX = 'a'.charCodeAt(0)
  const endX = startX + size

  for (var y = size; y > 0; y--) {
    for (var xNum = startX; xNum < endX; xNum++) {
      const x = String.fromCharCode(xNum)
      const piece = piecesByTile[`${x}${y}`]
      let pieceType: PieceType|undefined
      let pieceColor: Color|undefined
      console.log("Checking", x, y)
      if (piece) {
        console.log("Has piece!", x, y)
        pieceType = piece.piece
        pieceColor = piece.color
      }

      tiles.push(
        <TileView
          key={`${x}${y}`}
          boardSize={size}
          pieceType={pieceType}
          pieceColor={pieceColor}
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

const mapStateToProps = (state: State, ownProps: object): Props => {
  const {size, pieces} = state
  return {size, pieces}
}

export default connect(mapStateToProps)(BoardView);