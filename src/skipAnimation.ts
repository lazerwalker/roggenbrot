import State from "./state";

export default function skipAnimation(state: State): State {
  const newBoard = {...state.board}
  newBoard.pieces = newBoard.pieces.map((p) => {
    if (p.destination) {
      p.x = p.destination.x
      p.y = p.destination.y
      delete p.destination
    }
    return p
  })

  return {...state, board: newBoard}
}