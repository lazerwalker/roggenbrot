import State from "./state";
import { xyToPos } from "./Piece";

export default function animationTick(state: State): State {
  const newPieces = state.pieces.map((p) => {
    if (p.destination) {
      const newPiece = {
        ...p,
        x: p.destination.x,
        y: p.destination.y,
        pos: xyToPos(p.destination.x, p.destination.y)
      }
      delete newPiece.destination
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