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
    x: 'a',
    y: 3
  },
  {
    piece: PieceType.Rook,
    color: Color.White,
    x: 'd',
    y: 4
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
