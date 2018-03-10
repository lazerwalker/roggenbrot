import * as React from 'react';
import './App.css';
import Board from './components/BoardView';
import { DragDropContext } from 'react-dnd';
import State, { isAnimating } from './state';
import Piece from './Piece';
import { moveAction, newGameAction, animationTickAction, skipAnimationAction } from './actionCreators';

import MultiBackend from 'react-dnd-multi-backend'
// tslint:disable-next-line:no-submodule-imports
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { Action } from './action';
import reducer from './reducer';

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      board: {
        size: 5,
        pieces: [],
      },
      score: 0,
      turnCount: 0,
      isNewRound: false,
      animationSpeed: 300
    }

    this.drag = this.drag.bind(this) // lol TS + React

    setTimeout((() => this.dispatch(newGameAction())), 0)
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

    return (
      <div id='game'>
        <Board
          onDrag={this.drag}
          size={this.state.board.size}
          pieces={this.state.board.pieces}
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
