import Piece, { Color } from "./Piece";
import * as _ from "lodash";

export default interface State {
  size: number
  pieces: Piece[]
  isNewRound?: boolean
  animationSpeed: number // tick time in ms
  gameIsOver?: boolean
}

export function isAnimating(state: State): boolean {
  const movingPiece = _.find(state.pieces, (p) => !_.isUndefined(p.destination))
  return !_.isUndefined(movingPiece)
}

export function getPlayer(state: State): Piece|undefined {
  return state.pieces.find((p) => p.color === Color.White)
}