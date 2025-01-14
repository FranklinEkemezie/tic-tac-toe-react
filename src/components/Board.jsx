import boardStyles from '../assets/styles/board.module.css';
import Box from "./Box.jsx";

function Board() {

    return (
        <div className={boardStyles.boardContainer}>
            <div className={boardStyles.board}>
                {
                    Array(9).fill(null).map(() => (
                        <Box key={""} />
                    ))
                }
            </div>
        </div>
    );
}

export default Board;