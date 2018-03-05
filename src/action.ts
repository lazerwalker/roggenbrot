import Piece from "./Piece";

export enum ActionType {
  Move = "MOVE",
  NewGame = "NEW_GAME"
}

export interface MoveAction {
  type: ActionType.Move
  value: {
    piece: Piece,
    to: {x: number, y: number}
  }
}

export interface NewGameAction {
  type: ActionType.NewGame
}

export type Action = MoveAction | NewGameAction