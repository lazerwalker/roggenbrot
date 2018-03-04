import Piece from "./Piece";

export enum ActionType {
  Move = "MOVE"
}

export interface MoveAction {
  type: ActionType.Move
  value: {
    piece: Piece,
    to: {x: number, y: number}
  }
}

export type Action = MoveAction