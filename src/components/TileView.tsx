import * as React from 'react'
import Piece, { Color, PieceType, xyToPos } from '../Piece';
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
import { moveIsValid } from '../validMoves';
import * as _ from 'lodash';

interface Props {
  boardSize: number,
  pieces: Piece[]
  pieceType?: PieceType,
  pieceColor?: Color,
  x: number,
  y: number,
  text?: string
  onDrag: (piece: Piece, pos: {x: number, y: number}) => void
  overrideCanDrop?: boolean
}

interface DNDProps {
  connectDragSource: ConnectDragSource,
  connectDropTarget: ConnectDropTarget,
  canDrop: (props: Props) => boolean
  isOver: (props: Props) => boolean
}

const renderOverlay = (color: string) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  )
}

const TileView = (props: Props & DNDProps) => {
  const {boardSize, pieceType, pieceColor, connectDragSource, connectDropTarget, canDrop, isOver, text} = props

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

  const classes = ['tile']
  const isPlayer = (pieceColor === Color.White)
  if (isPlayer) {
    classes.push('player')
  }

  let component = connectDropTarget(
    <div className={classes.join(" ")} style={style}>
      {pieceChar}
      {isOver && !canDrop && renderOverlay('red')}
      {!isOver && canDrop && renderOverlay('yellow')}
      {isOver && canDrop && renderOverlay('green')}
      {_.isString(text) && (<div className='label'>{text}</div>)}
    </div>
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
      pos: xyToPos(props.x, props.y),
      x: props.x,
      y: props.y
    }
  }
}

// DROP TARGET

const tileTarget = {
  canDrop(props: Props, monitor: DropTargetMonitor) {
    if (!_.isUndefined(props.overrideCanDrop)) {
      return props.overrideCanDrop
    }

    const item = monitor.getItem() as Piece
    const pos = {x: props.x, y: props.y}
    // TODO: lol
    const fakeState = {
      size: props.boardSize,
      pieces: props.pieces,
      animationSpeed: 200,
      score: 0
    }
    return moveIsValid(item, pos, fakeState)
  },

  drop(props: Props & DNDProps, monitor: DropTargetMonitor) {
    const item = monitor.getItem() as Piece
    const pos = {x: props.x, y: props.y}
    props.onDrag(item, pos)
  }
}

function collectDrop(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver()
  }
}

const drop = DropTarget<Props>(DragType.Piece, tileTarget, collectDrop)
const drag = DragSource(DragType.Piece, pieceSource, collectDrag)
export default drop(drag(TileView))