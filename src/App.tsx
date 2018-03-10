import * as React from 'react';
import './App.css';
import Board from './components/BoardView';
import { DragDropContext } from 'react-dnd';
import State, { isAnimating, GameMode } from './state';
import Piece from './Piece';
import { moveAction, animationTickAction, skipAnimationAction } from './actionCreators';

import MultiBackend from 'react-dnd-multi-backend'
// tslint:disable-next-line:no-submodule-imports
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { Action } from './action';
import reducer from './reducers';

import setUpMenu from './menu/setUpMode'

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.drag = this.drag.bind(this) // lol TS + React

    this.state = setUpMenu()
  }

  drag(piece: Piece, pos: {x: number, y: number}) {
    this.dispatch(moveAction(piece, pos))
  }

  dispatch(action: Action) {
    const newState = reducer(this.state, action)
    if (newState.gameIsOver && isAnimating(newState.board)) {
      this.dispatch(skipAnimationAction())
      return
    }

    this.setState(newState)

    if (isAnimating(newState.board)) {
      setTimeout(() => { this.dispatch(animationTickAction()) }, newState.animationSpeed)
    }
  }

  render() {
    // TODO: lol
    if (this.state.gameIsOver) {
      setTimeout(() => { alert("You have lost!") }, 0)
    }

    const header = (this.state.mode === GameMode.Menu ? "capture the black king to start" : undefined)

    return (
      <div id='game'>
        <h1>Roggenbrot</h1>
        <div className='subtitle'>
          a <a href="#TODO:7drl">7drl</a> by <a href="https://lazerwalker.com">@lazerwalker</a></div>
        <Board
          onDrag={this.drag}
          size={this.state.board.size}
          pieces={this.state.board.pieces}
          header={header}
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

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
