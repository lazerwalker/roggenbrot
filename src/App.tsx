import * as React from 'react';
import './App.css';
import Board from './components/BoardView';

class App extends React.Component {
  render() {
    return (
      <Board size={5} />
    );
  }
}

export default App;
