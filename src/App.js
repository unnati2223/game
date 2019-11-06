import React from 'react';
import logo from './logo.svg';
import './App.css';

import Quiz from './components/Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          for this tutorial do:<br />
          npm install --save react-router-dom
          <br />
          npm install classNames
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Quiz />
    </div>
  );
}

export default App;
