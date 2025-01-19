import Board from "./Board.jsx";
import Timer from "./Timer.jsx";
import GameOverModal from "./GameOverModal.jsx";
import {useContext} from "react";
import GameContext from "../contexts/gameContext.jsx";

function Main() {

    const { board } = useContext(GameContext);

    return (
        <div>
            <Timer />
            <Board board={board} />
            <GameOverModal />
        </div>
    );
}

export default  Main;