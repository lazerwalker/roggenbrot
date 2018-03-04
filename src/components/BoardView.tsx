import * as React from 'react'
import TileView from './TileView';
import State from '../state';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Piece, { Color, PieceType, xyToPos } from '../Piece';

interface Props {
  size: number
  pieces: Piece[]
}

const BoardView = (props: Props) => {
  const {size, pieces} = props

  const piecesByTile = _.keyBy(pieces, 'pos')
  console.log(piecesByTile)

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

const mapStateToProps = (state: State, ownProps: object): Props => {
  const {size, pieces} = state
  return {size, pieces}
}

export default connect(mapStateToProps)(BoardView);