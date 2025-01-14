import timerStyles from '../assets/styles/timer.module.css';
import {useEffect, useState} from "react";
import useFormatTime from "../hooks/useFormatTime.js";

function Timer() {

    const totalTime = 400;

    const [timeLeft, setTimeLeft] = useState(totalTime);


    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft(prevState => prevState - 1);
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        }
    }, []);

    return (
        <div className={timerStyles.timerContainer}>
            <span className={timerStyles.currentPlayerDisplay}>
                X
            </span>
            <span className={timerStyles.timerDisplay}>
                {useFormatTime(timeLeft)}
            </span>
        </div>
    );
}

export default Timer;