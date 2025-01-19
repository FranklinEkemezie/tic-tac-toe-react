import React, { useContext, useEffect } from 'react';
import GameContext from '../contexts/gameContext';
import useGame from '../hooks/useGame';

function GameControlCentre( { children }) {

    // Check if game is over
    const { 
        currentState, board, players, playTimeLeft, gameOver 
    } = useContext(GameContext);
    const { getBoardSummary, getWinner, isBoardFull, getOtherPlayer } = useGame();

    const winner = getWinner(getBoardSummary(board, players));
    const gameIsOver = isBoardFull(board) || winner || (playTimeLeft <= 0);

    useEffect(() => {
        // Show game over, if game is over
        if (gameIsOver && currentState !== 'OVER') {
            gameOver();
            return;
        }
    
    }, [gameIsOver, currentState]);
    
    return <>{children}</>;
}

export default GameControlCentre;