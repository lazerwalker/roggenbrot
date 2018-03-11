import Piece, { Color } from "./Piece";
import * as _ from "lodash";

export default interface State {
  board: BoardState
  score: number
  turnCount: number
  mode: GameMode

  isNewRound?: boolean
  animationSpeed: number // tick time in ms
  gameIsOver?: boolean
  tutorialStep?: number
}

export enum GameMode {
  Menu = "menu",
  Game = "game",
  Tutorial = "tutorial"
}

export interface BoardState {
  size: number
  pieces: Piece[]
}

export function isAnimating(state: BoardState): boolean {
  const movingPiece = _.find(state.pieces, (p) => !_.isUndefined(p.destination))
  return !_.isUndefined(movingPiece)
}

export function getPlayer(state: BoardState): Piece|undefined {
  return state.pieces.find((p) => p.color === Color.White)
}