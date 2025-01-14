import timerStyles from '../assets/styles/timer.module.css';
import {useEffect, useState} from "react";

function Timer() {

    const totalTime = 400;

    const [timeLeft, setTimeLeft] = useState(totalTime);

    const formatTime = (timeInSecs) => {
        let timeStr = "";

        const secsInHr = 60 * 60;
        const hrsInTime = Math.floor(timeInSecs / secsInHr);

        const hrs = hrsInTime.toString().padStart(2, "0");

        timeInSecs -= hrsInTime * secsInHr;
        const mins = Math.floor(timeInSecs / 60).toString().padStart(2, "0");
        const secs = (timeInSecs % 60).toString().padStart(2, "0");

        timeStr = `${hrs}:${mins}:${secs}`;

        return timeStr;
    }

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
                {formatTime(timeLeft)}
            </span>
        </div>
    );
}

export default Timer;