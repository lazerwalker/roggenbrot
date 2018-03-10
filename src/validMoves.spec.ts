import { moveIsValid } from './validMoves'
import Piece, { PieceType, Color } from './Piece';
import * as _ from 'lodash';

function boolToString(input: boolean[]) {
  const nums = input.map((b) => b ? '1' : '0')
  const lineLength = Math.sqrt(nums.length)

  let result = ""
  let lineLengthCount = 0
  for (var i = 0; i < nums.length; i++) {
    result += nums[i]
    lineLengthCount++
    if (lineLengthCount === lineLength) {
      result += "\n"
      lineLengthCount = 0
    }
  }
  return result
}

function movesMatch(piece: Piece, board: string, pieces: Piece[] = []): boolean {
  const expectedArray: boolean[] = board.replace(/\s/g, '')
    .split('')
    .map((m) => !!parseInt(m, 10))

  const actualArray = checkWholeBoard(piece, Math.sqrt(expectedArray.length), pieces)

  boolToString(actualArray)

  return _.isEqual(expectedArray, actualArray)
}

function checkWholeBoard(piece: Piece, size: number = 5, pieces: Piece[] = []): boolean[] {
  const result = []

  const state = {size, pieces, animationSpeed: 200, score: 0}

  for (var y = size - 1; y >= 0; y--) {
    for (var x = 0; x < size; x++) {
      result.push(moveIsValid(piece, {x, y}, state))
    }
  }

  return result
}

describe("moveIsValid", () => {
  describe("rook", () => {
    let piece: Piece
    beforeEach(() => {
      piece = {
        piece: PieceType.Rook,
        color: Color.White,
        pos: "B4",
        x: 1,
        y: 3
      }
    })

    it("should allow only valid moves", () => {
      const expected = `
        01000
        11100
        01000
        01000
        01000
      `
      const ownPiece = {
        piece: PieceType.Bishop,
        color: Color.White,
        pos: "D4",
        x: 3,
        y: 3
      }

      expect(movesMatch(piece, expected, [ownPiece])).toBeTruthy()
    })
  })

  describe("bishop", () => {
    let piece: Piece
    beforeEach(() => {
      piece = {
        piece: PieceType.Bishop,
        color: Color.White,
        pos: "C2",
        x: 2,
        y: 1
      }
    })

    it("should only allow valid moves", () => {
      const expected = `
        00000
        00001
        01010
        00100
        01010
      `
      const enemyPiece = {
        piece: PieceType.Rook,
        color: Color.Black,
        pos: "B3",
        x: 1,
        y: 2
      }

      expect(movesMatch(piece, expected, [enemyPiece])).toBeTruthy()
    })
  })

  describe("knight", () => {
    let piece: Piece
    beforeEach(() => {
      piece = {
        piece: PieceType.Knight,
        color: Color.White,
        pos: "B4",
        x: 1,
        y: 3
      }
    })

    it("should only allow valid moves", () => {
      const expected = `
        00010
        01000
        00010
        10100
        00000
      `
      expect(movesMatch(piece, expected)).toBeTruthy()
    })
  })

  describe("queen", () => {
    let piece: Piece
    beforeEach(() => {
      piece = {
        piece: PieceType.Queen,
        color: Color.White,
        pos: "B3",
        x: 1,
        y: 2
      }
    })

    it("should only allow valid moves", () => {
      const enemyPiece = {
        piece: PieceType.Rook,
        color: Color.Black,
        pos: "C2",
        x: 2,
        y: 1
      }

      const ownPiece = {
        piece: PieceType.Bishop,
        color: Color.White,
        pos: "D3",
        x: 3,
        y: 2
      }

      const expected = `
        01010
        11100
        11100
        11100
        01000
      `

      expect(movesMatch(piece, expected, [enemyPiece, ownPiece])).toBeTruthy()
    })
  })

  describe("king", () => {
    let piece: Piece
    beforeEach(() => {
      piece = {
        piece: PieceType.King,
        color: Color.White,
        pos: "B3",
        x: 1,
        y: 2
      }
    })

    it("should only allow valid moves", () => {
      const expected = `
        00000
        11100
        11100
        11100
        00000
      `
      expect(movesMatch(piece, expected)).toBeTruthy()
    })
  })

  describe("pawn", () => {
    let piece: Piece
    beforeEach(() => {
      piece = {
        piece: PieceType.Pawn,
        color: Color.White,
        pos: "B3",
        x: 1,
        y: 2
      }
    })

    describe("when there are no pieces to capture", () => {
      it("should only allow valid moves", () => {
        const expected = `
          00000
          01000
          11100
          01000
          00000
        `
        expect(movesMatch(piece, expected)).toBeTruthy()
      })
    })

    describe("when there is a piece blocking the way", () => {
      it("should not be able to move to those spaces", () => {
        const expected = `
          00000
          00000
          11100
          00000
          00000
        `

        const enemyPiece = {
          piece: PieceType.Rook,
          color: Color.Black,
          pos: "B4",
          x: 1,
          y: 3
        }

        const ownPiece = {
          piece: PieceType.Bishop,
          color: Color.White,
          pos: "B2",
          x: 1,
          y: 1
        }

        expect(movesMatch(piece, expected, [enemyPiece, ownPiece])).toBeTruthy()
      })
    })

    describe("when there is a black piece to capture", () => {
      it("should include the capture move", () => {
        const expected = `
          00000
          01100
          11100
          01000
          00000
        `

        const capturePiece = {
          piece: PieceType.Rook,
          color: Color.Black,
          pos: "C4",
          x: 2,
          y: 3
        }

        expect(movesMatch(piece, expected, [capturePiece])).toBeTruthy()
      })
    })
  })
})