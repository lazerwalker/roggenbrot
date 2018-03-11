import State, { GameMode } from "./state";
import { Action } from "./action";
import { assertUnreachable } from "./helpers";

import gameReducer from './game/reducer'
import menuReducer from './menu/reducer'
import tutorialReducer from './tutorial/reducer'

export default function reducer(state: State, action: Action): State {
  switch (state.mode) {
    case GameMode.Game:
      return gameReducer(state, action)
    case GameMode.Menu:
      return menuReducer(state, action)
      case GameMode.Tutorial:
      return tutorialReducer(state, action)
    default:
      return assertUnreachable(state.mode)
  }
}