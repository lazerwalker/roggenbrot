import State from "./state";
import { xyToPos, PieceType, Color } from "./Piece";

export default function animationTick(state: State): State {
  const newState = {...state}
  const newBoard = {...newState.board}

  newBoard.pieces = newBoard.pieces.map((p) => {
    if (p.destination) {
      let newX = p.x
      let newY = p.y

      if (p.piece === PieceType.Knight) {
        if (p.destination.x > p.x) {
          newX += 1
        } else if (p.destination.x < p.x) {
          newX -= 1
        } else if (p.destination.y > p.y) {
          newY += 1
        } else if (p.destination.y < p.y) {
          newY -= 1
        }
      } else {
        if (p.destination.x > p.x) {
          newX += 1
        } else if (p.destination.x < p.x) {
          newX -= 1
        }

        if (p.destination.y > p.y) {
          newY += 1
        } else if (p.destination.y < p.y) {
          newY -= 1
        }
      }

      const newPiece = {
        ...p,
        x: newX,
        y: newY,
        pos: xyToPos(newX, newY)
      }

      if (newX === p.x && newY === p.y) {
        delete newPiece.destination

        const player = newBoard.pieces.find((pl) => pl.x === newX && pl.y === newY && pl.color === Color.White)
        if (player) {
          newState.gameIsOver = true
        }
      }

      return newPiece
    } else {
      return {...p}
    }
  })

  if (newState.gameIsOver) {
    newBoard.pieces = newBoard.pieces.filter((p) => p.color === Color.Black)
  }

  newState.board = newBoard
  return newState
}