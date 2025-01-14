
const useFormatTime = (timeInSecs) => {
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

export  default useFormatTime;
