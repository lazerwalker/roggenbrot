import * as React from 'react'
import TileView from './TileView';
import State from '../state';
import { connect } from 'react-redux';

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
  return { size: state.size }
}

export default connect(mapStateToProps)(BoardView);