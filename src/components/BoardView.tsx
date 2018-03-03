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
    return `${piece.y},${piece.x}`
  })
  console.log(piecesByTile)

  const tiles = []
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      const piece = piecesByTile[`${y},${x}`]
      let pieceType: PieceType|undefined
      let pieceColor: Color|undefined
      if (piece) {
        pieceType = piece.piece
        pieceColor = piece.color
      }

      tiles.push(
        <TileView
          key={`${y}-${x}`}
          boardSize={size}
          x={x}
          y={y}
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