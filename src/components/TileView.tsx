import * as React from 'react'
import Piece, { Color, PieceType } from '../Piece';
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSourceConnector,
  DragSourceMonitor,
  DragSource,
  DropTargetMonitor,
  DropTarget,
  DropTargetConnector } from 'react-dnd';
import { asciiFromPiece } from '../helpers';
import { DragType } from '../constants';

interface Props {
  boardSize: number,
  pieceType?: PieceType,
  pieceColor?: Color,
}

interface DNDProps {
  connectDragSource: ConnectDragSource,
  connectDropTarget: ConnectDropTarget
}

const TileView = (props: Props & DNDProps) => {
  const {boardSize, pieceType, pieceColor, connectDragSource, connectDropTarget} = props

  // TODO: Would love if I could do this in pure CSS
  const percent = (1.0 / boardSize) * 100
  const style = {
    height: `${percent}%`,
    width: `${percent}%`,
  }

  let pieceChar = ""
  if (pieceType !== undefined && pieceColor !== undefined) {
    pieceChar = asciiFromPiece(pieceType, pieceColor)
  }

  let component = connectDropTarget(
    <div className='tile' style={style}>{pieceChar}</div>
  )

  if (pieceColor !== undefined && pieceColor === Color.White) {
    return connectDragSource(component)
  }

  return component
}

// DRAG SOURCE

const collectDrag = (connect: DragSourceConnector, monitor: DragSourceMonitor)  => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const pieceSource = {
  beginDrag(props: Props): Piece {
    console.log("Begining drag", props)
    return {
      piece: props.pieceType!,
      color: props.pieceColor!,
      pos: "A1", // TODO
      x: 1,
      y: 1
    }
  }
}

// DROP TARGET

const tileTarget = {
  drop(props: Props & DNDProps, monitor: DropTargetMonitor) {
    console.log("Drop!", props)
  }
}

function collectDrop(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

const drop = DropTarget<Props>(DragType.Piece, tileTarget, collectDrop)
const drag = DragSource(DragType.Piece, pieceSource, collectDrag)
export default drop(drag(TileView))