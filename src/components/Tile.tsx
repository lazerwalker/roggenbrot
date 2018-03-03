import * as React from 'react'

interface Props {
  x: number,
  y: number,
  boardSize: number
}

export const Tile = (props: Props) => {
  const {boardSize} = props

  // TODO: Would love if I could do this in pure CSS
  const percent = (1.0 / boardSize) * 100
  const style = {
    height: `${percent}%`,
    width: `${percent}%`,
  }
  return (
    <div className='tile' style={style} />
  )
}