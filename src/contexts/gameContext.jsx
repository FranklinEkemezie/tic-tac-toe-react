import React from "react";

// Initial state variables
const [ playerX, playerO ] = ['X', 'O'];
const players = {playerX, playerO};
const initialBoardState = Array(9).fill(null);
const totalPlayTime = 5; // each player has ${totalPlayTime}  seconds to decide.

// Game state
export const initialGameState = {
    players,
    totalPlayTime,
    currentState: 'OFF',
    nextPlayer: null,
    board: initialBoardState,
    playTimeLeft: totalPlayTime,
    timer: null
};

// Create Game context

const GameContext = React.createContext({initialGameState});

export default  GameContext;
