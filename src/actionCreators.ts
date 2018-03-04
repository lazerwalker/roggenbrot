import { ActionType, MoveAction } from "./action";
import Piece from "./Piece";

export function moveAction(piece: Piece, to: {x: number, y: number}): MoveAction {
  return {
    type: ActionType.Move,
    value: { piece, to }
  }
}