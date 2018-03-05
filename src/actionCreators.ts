import { ActionType, MoveAction, NewGameAction } from "./action";
import Piece from "./Piece";

export function moveAction(piece: Piece, to: {x: number, y: number}): MoveAction {
  return {
    type: ActionType.Move,
    value: { piece, to }
  }
}

export function newGameAction(): NewGameAction {
  return { type: ActionType.NewGame }
}