import * as React from 'react';
import './App.css';
import Board from './components/BoardView';
import { DragDropContext } from 'react-dnd';
import State, { isAnimating, GameMode } from './state';
import Piece from './Piece';
import { moveAction, animationTickAction } from './actionCreators';

import MultiBackend from 'react-dnd-multi-backend'
// tslint:disable-next-line:no-submodule-imports
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { Action } from './action';
import reducer from './reducers';

import TutorialContent from './tutorial/content'
import * as _ from 'lodash';
import allowedMoveTiles from './allowedMoveTiles';

import setUpMenu from './menu/setUpMode'
import setUpGame from './game/setUpMode'

interface Props {
  seed?: string
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.drag = this.drag.bind(this) // lol TS + React
    this.onHeaderTap = this.onHeaderTap.bind(this)

    if (props.seed) {
      this.state = setUpGame(undefined, props.seed)
    } else {
      this.state = setUpMenu()
    }

  }

  drag(piece: Piece, pos: {x: number, y: number}) {
    this.dispatch(moveAction(piece, pos))
  }

  onHeaderTap() {
    this.setState(setUpMenu())
  }

  dispatch(action: Action) {
    const newState = reducer(this.state, action)
    this.setState(newState)

    if (isAnimating(newState.board)) {
      setTimeout(() => { this.dispatch(animationTickAction()) }, newState.animationSpeed)
    }
  }

  render() {
    const header = calculateHeader(this.state)
    const {board} = this.state

    const allowedDropPositions = allowedMoveTiles(this.state)

    return (
      <div id='game'>
        <h1>Roggenbrot</h1>
        <div className='subtitle'>
          a <a href="#TODO:7drl">7drl</a> by <a href="https://lazerwalker.com">@lazerwalker</a></div>
        <Board
          onDrag={this.drag}
          size={board.size}
          pieces={board.pieces}
          header={header}
          onHeaderTap={this.onHeaderTap}
          allowedDropPositions={allowedDropPositions}
        />
        <div id="turns">
          <span>{this.state.turnCount}</span> moves
        </div>
        <div id="score">
          score: <span>{this.state.score}</span>
        </div>
      </div>
    );
  }
}

function calculateHeader(state: State): string|undefined {
  if (state.mode === GameMode.Menu) {
    return "capture a piece to start."
  }

  if (state.mode === GameMode.Game) {
    if (state.gameIsOver) {
      return "you lost. tap here to restart."
    }
  }

  if (state.mode === GameMode.Tutorial) {
    if (!_.isUndefined(state.tutorialStep)) {
      return TutorialContent[state.tutorialStep].text
    }
  }

  return undefined
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
