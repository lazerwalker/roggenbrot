import State, { GameMode } from "./state"
import TutorialContent from "./tutorial/content"

export default function(state: State): string[]|undefined {
  if (state.mode === GameMode.Tutorial && state.tutorialStep !== undefined) {
    return [TutorialContent[state.tutorialStep].to]
  }

  return undefined
}