import State from "./state";
import Piece, { Color, Position } from "./Piece";
import { validMoves } from "./validMoves";
import * as _ from "lodash";

export default function calculateEnemyMove(state: State, enemy: Piece): Position|undefined {
  const possibleMoves = validMoves(enemy, state)
  const player = state.pieces.find((p) => p.color === Color.White)
  if (!player) { return }

  const sorted = _.sortBy(possibleMoves, (pos) => {
    return Math.abs(pos.x - player.x) + Math.abs(pos.y - player.y)
  })

  return sorted[0]
}