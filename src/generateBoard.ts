import State from "./state";
import { Color } from "./Piece";
import randomPiece from "./randomPiece";

export default function generateBoard(state: State, triggerNewRound: boolean = true): State {
  const {size} = state

  const pieces = []

  if (state.pieces.length > 0) {
    const player = state.pieces.find((p) => p.color === Color.White)
    if (player) {
      pieces.push(player)
    } else {
      pieces.push(randomPiece(Color.White, state.size, []))
    }
  } else {
    pieces.push(randomPiece(Color.White, state.size, []))
  }

  pieces.push(randomPiece(Color.Black, state.size, pieces, true))
  for (var i = 0; i < 4; i++) {
    pieces.push(randomPiece(Color.Black, state.size, pieces))
  }

  return {
    ...state,
    size,
    pieces,
    isNewRound: triggerNewRound
  }
}