// src/components/TopUserPanel.js
import React from 'react';
import "../Styles/userpanel.css"

const TopUserPanel = ({ score, startGame, resetGame }) => {
  return (
    <div className="user-panel">
      <div className="score-display">
        <h2>Score: {score}</h2>
      </div>
      <div className="controls">
        <button className="btn start-btn" onClick={startGame}>
          Start Game
        </button>
        <button className="btn reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TopUserPanel;
