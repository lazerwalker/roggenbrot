import { ActionType, Action, MoveAction } from "./action";
import Piece from "./Piece";

export function moveAction(piece: Piece, to: {x: number, y: number}): MoveAction {
  return {
    type: ActionType.Move,
    value: { piece, to }
  }
}

export function newGameAction(): Action {
  return { type: ActionType.NewGame }
}

export function animationTickAction(): Action {
  return { type: ActionType.AnimationTick }
}

export function skipAnimationAction(): Action {
  return { type: ActionType.SkipAnimation }
}