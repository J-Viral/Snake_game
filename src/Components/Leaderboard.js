import React from 'react';

const Leaderboard = ({ highScore }) => {
    return (
        <div id="leaderboard">
            <h1>Leaderboard</h1>
            <h2>High Score</h2>
            <p id="highScoreDisplay">{highScore > 0 ? highScore : "No high score yet"}</p>
        </div>
    );
};

export default Leaderboard;
