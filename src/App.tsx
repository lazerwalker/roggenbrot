import * as React from 'react';
import './App.css';
import Board from './components/BoardView';
import { DragDropContext } from 'react-dnd';
import State, { isAnimating } from './state';
import Piece from './Piece';
import { moveAction, newGameAction, animationTickAction } from './actionCreators';

import MultiBackend from 'react-dnd-multi-backend'
// tslint:disable-next-line:no-submodule-imports
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { Action } from './action';
import reducer from './reducer';

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      size: 5,
      pieces: [],
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
    this.setState(newState)
    if (isAnimating(newState)) {
      setTimeout(() => { this.dispatch(animationTickAction()) }, newState.animationSpeed)
    }
  }

  render() {
    return (
      <Board
        onDrag={this.drag}
        size={this.state.size}
        pieces={this.state.pieces}
      />
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
