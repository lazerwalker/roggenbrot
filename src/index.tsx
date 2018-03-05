import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer';
import State from './state';
import { Color, PieceType } from './Piece';

const state = {
  size: 5,
  pieces: [{
    piece: PieceType.Pawn,
    color: Color.Black,
    x: 2,
    y: 5,
    pos: "b4"
  },
  {
    piece: PieceType.Rook,
    color: Color.White,
    x: 4,
    y: 3,
    pos: "d2"
  },
  {
    piece: PieceType.Bishop,
    color: Color.Black,
    x: 0,
    y: 1,
    pos: "a2"
  }]
}

const store = createStore<State>(reducer, state)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
