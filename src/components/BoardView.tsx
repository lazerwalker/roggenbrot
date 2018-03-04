import * as React from 'react'
import TileView from './TileView';
import State from '../state';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Piece, { Color, PieceType, xyToPos } from '../Piece';
import { Dispatch } from 'redux';
import { moveAction } from '../actionCreators';

interface Props {
  size: number
  pieces: Piece[]
}

interface DispatchProps {
  onDrag: (piece: Piece, pos: {x: number, y: number}) => void
}

const BoardView = (props: Props & DispatchProps) => {
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

const mapStateToProps = (state: State, ownProps: object): Props => {
  const {size, pieces} = state
  return {size, pieces}
}

const mapDispatchToProps = (dispatch: Dispatch<State>, ownProps: Props): DispatchProps => {
  return {
    onDrag: (piece: Piece, to: {x: number, y: number}) => {
      dispatch(moveAction(piece, to))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);