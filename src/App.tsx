import * as React from 'react';
import './App.css';
import Board from './components/BoardView';
import { DragDropContext } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend'
// tslint:disable-next-line:no-submodule-imports

import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
class App extends React.Component {
  render() {
    return (
      <Board />
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
