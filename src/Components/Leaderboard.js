import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const storedHighScore = JSON.parse(localStorage.getItem('highScore'));
        if (storedHighScore !== null) {
            setHighScore(storedHighScore);
        }
    }, []);

    return (
        <div id="leaderboard">
            <h1>Leaderboard</h1>
            <h2>High Score</h2>
            <p id="highScoreDisplay">{highScore > 0 ? highScore : "No high score yet"}</p>
        </div>
    );
};

export default Leaderboard;
