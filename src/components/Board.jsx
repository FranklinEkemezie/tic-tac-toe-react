import boardStyles from '../assets/styles/board.module.css';
import Box from "./Box.jsx";

function Board({ board, highlightBoxes }) {

    return (
        <div className={boardStyles.boardContainer}>
            <div className={boardStyles.board}>
                {
                    board.map((_, i) => (
                        <Box
                            key={`box_${i}`}
                            boxIndex={i}
                            highlight={
                                Array.isArray(highlightBoxes) && 
                                highlightBoxes.includes(i)
                            }
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Board;