import Piece, { Color, PieceType } from "../Piece";

export interface Tutorial {
  startingPieces: Piece[],
  steps: TutorialStep[]
}

interface TutorialStep {
  to: string
  text: string
  pieces: Piece[]
}

export default [
  {
    text: "play as white",
    to: "c4",
    pieces: [
      {
        color: Color.Black,
        piece: PieceType.Rook,
        x: 0,
        y: 0,
        pos: 'a1',
      },
      {
        color: Color.Black,
        piece: PieceType.King,
        x: 0,
        y: 2,
        pos: 'a3',
      },
      {
        color: Color.Black,
        piece: PieceType.Bishop,
        x: 1,
        y: 3,
        pos: 'b4',
      },
      {
        color: Color.White,
        piece: PieceType.Knight,
        x: 4,
        y: 2,
        pos: 'e3'
      }
    ]
  },
  {
    text: "after you move, all enemies move",
    to: "b2",
    pieces: [
      {
        color: Color.Black,
        piece: PieceType.Rook,
        x: 0,
        y: 0,
        pos: 'a1',
        destination: {x: 4, y: 0}
      },
      {
        color: Color.Black,
        piece: PieceType.King,
        x: 0,
        y: 2,
        pos: 'a3',
        destination: {x: 0, y: 1}
      },
      {
        color: Color.Black,
        piece: PieceType.Bishop,
        x: 1,
        y: 3,
        pos: 'b4',
        destination: {x: 2, y: 4}
      },
      {
        color: Color.White,
        piece: PieceType.Knight,
        x: 2,
        y: 3,
        pos: 'c4'
      }
    ]
  },
  {
    text: "capture a piece to become that piece",
    to: "d1",
    pieces: [
      {
        color: Color.Black,
        piece: PieceType.Rook,
        x: 4,
        y: 0,
        pos: 'e1',
        destination: {x: 3, y: 0}
      },
      {
        color: Color.Black,
        piece: PieceType.King,
        x: 0,
        y: 1,
        pos: 'a2',
        destination: {x: 1, y: 0}
      },
      {
        color: Color.Black,
        piece: PieceType.Bishop,
        x: 2,
        y: 4,
        pos: 'c5',
        destination: {x: 4, y: 2}
      },
      {
        color: Color.White,
        piece: PieceType.Knight,
        x: 1,
        y: 1,
        pos: 'b2'
      }
    ]
  },
  {
    text: "progress by capturing the king",
    to: "c1",
    pieces: [
      {
        color: Color.Black,
        piece: PieceType.King,
        x: 1,
        y: 0,
        pos: 'b1',
        destination: {x: 2, y: 0}
      },
      {
        color: Color.Black,
        piece: PieceType.Bishop,
        x: 4,
        y: 2,
        pos: 'e3',
        destination: {x: 3, y: 3}
      },
      {
        color: Color.White,
        piece: PieceType.Rook,
        x: 3,
        y: 0,
        pos: 'd1'
      }
    ]
  }
]
