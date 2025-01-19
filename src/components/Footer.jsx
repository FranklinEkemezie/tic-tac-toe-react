import footerStyles from '../assets/styles/footer.module.css';
import {useContext} from "react";
import GameContext from "../contexts/gameContext.jsx";
import useGame from '../hooks/useGame.js';

function Footer() {

    const { currentState, board, nextPlayer, players, restartGame } = useContext(GameContext);
    const { suggestMove, getMinmaxMove } = useGame();

    function handleSuggestMove() {

        if (currentState !== 'ON') {
            alert('Game not started');
            return;
        }

        const suggestedMove = suggestMove(board, () => getMinmaxMove(
            board, nextPlayer, players
        ));

        alert(`Suggested box number: ${suggestedMove + 1}`);
    }

    return (
        <div className={footerStyles.footer}>
            <div>
                <button
                    className={footerStyles.restartBtn}
                    onClick={restartGame}
                >
                    Restart Game
                </button>
            </div>
            <div>
                <button
                    className={footerStyles.suggestBtn}
                    onClick={handleSuggestMove}
                >
                    Suggest Move
                </button>

            </div>
        </div>
    )
}

export default Footer;