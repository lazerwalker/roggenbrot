import Piece from "./Piece";

export default interface State {
  size: number
  pieces: Piece[]
  isNewRound: boolean
}