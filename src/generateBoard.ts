import State from "./state";
import { Color } from "./Piece";
import randomPiece from "./randomPiece";
import { playerCanMove } from "./validMoves";

export default function generateBoard(state: State, triggerNewRound: boolean = true): State {
  let newState = state
  do {
    newState = generateRawBoard(state, triggerNewRound)
  } while (!playerCanMove(newState.board))

  return newState
}

function generateRawBoard(state: State, triggerNewRound: boolean): State {
  const {size} = state.board

  const pieces = []

  if (state.board.pieces.length > 0) {
    const player = state.board.pieces.find((p) => p.color === Color.White)
    if (player) {
      pieces.push(player)
    } else {
      pieces.push(randomPiece(Color.White, size, []))
    }
  } else {
    pieces.push(randomPiece(Color.White, size, []))
  }

  pieces.push(randomPiece(Color.Black, size, pieces, true))
  for (var i = 0; i < 4; i++) {
    pieces.push(randomPiece(Color.Black, size, pieces))
  }

  const board = {size, pieces}

  return {
    ...state,
    board,
    isNewRound: triggerNewRound
  }
}