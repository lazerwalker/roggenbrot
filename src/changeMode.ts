import State, { GameMode } from "./state"

import setUpGame from "./game/setUpMode"
import setUpMenu from "./menu/setUpMode"
import { assertUnreachable } from "./helpers";

export default function changeMode(state: State, mode: GameMode): State {
  switch (mode) {
    case GameMode.Game:
      return setUpGame(state)
    case GameMode.Menu:
      return setUpMenu()
    default:
      assertUnreachable(mode)
      // lol, TS. Type safety means we'll never get here
      return undefined!

    }
}