// src/Game.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';

const cellSize = 20;
const canvasSize = 400;
const rows = canvasSize / cellSize;
const cols = canvasSize / cellSize;

const getRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
};

const Game = () => {
    const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [food, setFood] = useState(getRandomPosition);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return JSON.parse(localStorage.getItem('highScore')) || 0;
    });
    const [isGameOver, setIsGameOver] = useState(false);
    const canvasRef = useRef(null);

    const handleKeyPress = useCallback((event) => {
        if (isGameOver && event.key === 'Enter') {
            restartGame();
            return;
        }
        if (!isGameOver) {
            switch (event.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        }
    }, [direction, isGameOver]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const updateGame = useCallback(() => {
        if (isGameOver) return;

        const newSnake = [...snake];
        const newHead = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (isCollision(newHead, newSnake)) {
            setIsGameOver(true);
            saveHighScore(score);
            return;
        }

        if (newHead.x === food.x && newHead.y === food.y) {
            newSnake.unshift(newHead);
            setFood(getRandomPosition);
            setScore(prevScore => prevScore + 10);
        } else {
            newSnake.pop();
            newSnake.unshift(newHead);
        }

        setSnake(newSnake);
    }, [snake, direction, food, score, isGameOver]);

    useEffect(() => {
        const interval = setInterval(updateGame, 100);
        return () => clearInterval(interval);
    }, [updateGame]);

    const isCollision = (head, snake) => {
        return (
            head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows ||
            snake.some(segment => segment.x === head.x && segment.y === head.y)
        );
    };

    const saveHighScore = (currentScore) => {
        if (currentScore > highScore) {
            setHighScore(currentScore);
            localStorage.setItem('highScore', JSON.stringify(currentScore));
        }
    };

    const restartGame = () => {
        setSnake([{ x: 2, y: 2 }]);
        setDirection({ x: 1, y: 0 });
        setFood(getRandomPosition());
        setScore(0);
        setIsGameOver(false);
    };

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasSize, canvasSize);

            ctx.fillStyle = 'green';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
            });

            ctx.fillStyle = 'red';
            ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
        }
    }, [snake, food]);

    return (
        <div className="game-container">
            <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
            <div id="scoreBoard">Score: {score}</div>
            {isGameOver && <div id="gameOver">Game Over! Press Enter to Restart</div>}
        </div>
    );
};

export default Game;