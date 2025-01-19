import GameContext, { initialGameState } from "./gameContext.jsx";
import {useReducer, useRef} from "react";
import GameReducer from "../reducers/GameReducer.jsx";
import useGame from "../hooks/useGame.js";

// eslint-disable-next-line react/prop-types
const GameContextProvider = ( { children }) => {

    const { players } = initialGameState;

    const [ gameState, gameDispatch ] = useReducer(GameReducer, initialGameState);
    const { startTimer, stopTimer } = useGame();

    const playTimeLeftRef = useRef();
    playTimeLeftRef.current = gameState.playTimeLeft;

    // Actions

    const startGame = () => {

        gameDispatch({
            type: 'START_GAME',
            payload: { 
                timerId: startTimer(1000, () => {
                    updatePlayTimeLeft(playTimeLeftRef.current - 1);
                }) 
            }
        });
    }

    const updateBoard = (boxIndex, player) => {
        gameDispatch({
            type: 'UPDATE_BOARD',
            payload: { boxIndex, player }
        })
    }

    const updateNextPlayer = () => {
        gameDispatch({
            type: 'UPDATE_NEXT_PLAYER',
            payload: { players }
        })
    }

    const playMove = (boxIndex, player) => {
        gameDispatch({
            type: 'PLAY_MOVE',
            payload: { players, boxIndex, player }
        });
    }

    const restartGame = () => {
        stopTimer(gameState.timer);

        gameDispatch({
            type: 'RESTART_GAME',
            payload: { initialGameState }
        });

        console.clear();
    }

    const updatePlayTimeLeft = (currPlayTimeLeft) => {
        gameDispatch({
            type: 'UPDATE_PLAYTIME_LEFT',
            payload: {
                playTimeLeft: currPlayTimeLeft
            }
        });
    }

    const resetTimer = () => {
        // Stop the timer running now
        stopTimer(gameState.timer);

        // Start a new one
        gameDispatch({
            type: 'RESET_TIMER',
            payload: { 
                playTimeLeft: initialGameState.totalPlayTime,
                timerId: startTimer(1000, () => {
                    updatePlayTimeLeft(playTimeLeftRef.current - 1);
                }) 
            }
        });
    }

    const gameOver = () => {
        stopTimer(gameState.timer);
        console.log(gameState.playTimeLeft);
        gameDispatch({
            type: 'GAME_OVER'
        });
    }

    const gameContextValue = {
        ...gameState,
        startGame,
        updateBoard,
        updateNextPlayer,
        playMove,
        updatePlayTimeLeft,
        resetTimer,
        restartGame,
        gameOver
    }

    return (
        <GameContext.Provider value={gameContextValue}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContextProvider;