import Piece from "./Piece";

export enum ActionType {
  Move = "MOVE",
  NewGame = "NEW_GAME",
  AnimationTick = "ANIMATION_TICK"
}

export interface MoveAction {
  type: ActionType.Move
  value: {
    piece: Piece,
    to: {x: number, y: number}
  }
}

export interface GenericAction {
  type: ActionType
}

export type Action = MoveAction | GenericAction