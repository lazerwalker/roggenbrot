import State, { GameMode } from '../state'
import { Color, PieceType } from '../Piece'

export default function(): State {
  const player = {
    x: 2,
    y: 2,
    pos: "c3",
    color: Color.White,
    piece: PieceType.Queen
  }

  const newGame = {
    x: 2,
    y: 0,
    pos: "c1",
    color: Color.Black,
    piece: PieceType.King,
    text: "new game"
  }

  return {
    board: {
      size: 5,
      pieces: [player, newGame],
    },
    score: 0,
    turnCount: 0,
    mode: GameMode.Menu,

    animationSpeed: 300
  }
}