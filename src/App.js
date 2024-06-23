// src/App.js

import React from 'react';
import Game from './Components/Game';
import Leaderboard from './Components/Leaderboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Snake Game</h1>
      <div className='main'>
        <Game />
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;