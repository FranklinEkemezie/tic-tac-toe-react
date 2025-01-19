import timerStyles from '../assets/styles/timer.module.css';
import {useContext} from "react";
import useFormatTime from "../hooks/useFormatTime.js";
import GameContext from "../contexts/gameContext.jsx";

function Timer() {
    const { 
        currentState, startGame, nextPlayer, playTimeLeft 
    } = useContext(GameContext);

    const timerTitle = ({
        'OFF': (
            <button className={timerStyles.startGameBtn} onClick={startGame}>
                Start Game
            </button>
        ),
        'ON': useFormatTime(playTimeLeft),
        'OVER': 'Game Over'
    })[currentState];

    return (
        <div className={timerStyles.timerContainer}>
            <span className={timerStyles.nextPlayerDisplay}>
                {nextPlayer || "❔"}
            </span>
            <span className={timerStyles.timerDisplay}>{timerTitle}</span>
        </div>
    );
}

export default Timer;