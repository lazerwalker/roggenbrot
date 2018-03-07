import State from "./state";
import { xyToPos, PieceType } from "./Piece";

export default function animationTick(state: State): State {
  const newPieces = state.pieces.map((p) => {
    if (p.destination) {
      if (p.piece === PieceType.Knight) {
        // TODO:
        const newKnight = {
          ...p,
          x: p.destination.x,
          y: p.destination.y,
          pos: xyToPos(p.destination.x, p.destination.y)
        }

        delete newKnight.destination
        return newKnight
      }

      let newX = p.x
      let newY = p.y

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

      const newPiece = {
        ...p,
        x: newX,
        y: newY,
        pos: xyToPos(newX, newY)
      }

      if (newX === p.x && newY === p.y) {
        delete newPiece.destination
      }

      return newPiece
    } else {
      return {...p}
    }
  })

  return {
    ...state,
    pieces: newPieces
  }
}