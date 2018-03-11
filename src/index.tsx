import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let seed: string|undefined
if (window.location.hash !== "") {
  seed = window.location.hash.slice(1)
}

ReactDOM.render(
  <App seed={seed}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
