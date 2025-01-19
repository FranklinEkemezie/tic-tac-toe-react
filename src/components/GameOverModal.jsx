import modalStyles from '../assets/styles/modal.module.css';
import useGame from "../hooks/useGame.js";
import {useContext} from "react";
import GameContext from "../contexts/gameContext.jsx";
import Board from "./Board.jsx";

// eslint-disable-next-line react/prop-types
function GameOverModal() {

    const { 
        currentState, board, nextPlayer, players, restartGame 
    } = useContext(GameContext);
    const { isBoardFull, getBoardSummary, getWinner } = useGame();

    if (currentState !== 'OVER') {
        // don't show modal
        return (<></>);
    }

    const winner = getWinner(getBoardSummary(board, players));

    let title = '';
    let winCombo = [];
    if (winner) {
        const { player, combo } = winner;

        title = <><b>Player {players[player]}</b> won!</>
        winCombo = combo.split('').map(e => +e);
    } else if (isBoardFull(board)) {
        title = `There was a tie`;
    } else {
        title = <>Time's up. <b>Player {nextPlayer}</b> lost!</>;
    }

    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div className={modalStyles.modalContainer}>
                    <div style={{textAlign: "center"}}>
                        <h1 style={ {
                            "margin": ".4rem"
                        } }>Game Over</h1>
                        <p style={ {
                            "margin": 0
                        } }>{title}</p>
                    </div>

                    <hr/>

                    <div>
                        <Board board={board} highlightBoxes={winCombo} />
                    </div>

                    <hr/>

                    <div>
                        <button
                            className={modalStyles.restartBtn} onClick={restartGame}>
                            Restart Game
                        </button>
                    </div>
                </div>
            </div>
        </>
    )


}

export default GameOverModal;