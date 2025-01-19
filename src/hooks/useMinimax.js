import { max, min } from "mathjs";
import useGame from "./useGame";


export function minmax(board, mainPlayer, player, players, isMaxPlayerTurn=true, parentMove=null) {

    // Get a copy/clone of the board
    const tempBoard = [...board];

    // Get some game utils
    const { isBoardFull, getWinner, getBoardSummary, getOtherPlayer } = useGame();

    // Return a heuristic value for the board, state
    const evaluateBoard = (winner, player, players) => {
        if (winner === null) {
            return 0;
        }

        return players[winner.player] === player ? 10 : -10;
    }

    // Possible moves
    const possibleMoves = (board) => board
        .map((e, i) => ({e, i}))
        .filter(v => ! v.e)
        .map(v => v.i)
    ;

    // Expected max and min evaluation values
    const expectedMaxVal = 10;
    const expectedMinVal = -10;

    // MinMax logic starts here

    // console.log(tempBoard);

    const winner = getWinner(getBoardSummary(tempBoard, players));
    if (winner || isBoardFull(tempBoard)) {
        const resEval = evaluateBoard(winner, mainPlayer, players);
        // console.log("Winner: ", winner);
        // console.log(`Eval for ${mainPlayer}: ${resEval}`);
        return {
            score: resEval,
            move: parentMove
        };
    }


    if (isMaxPlayerTurn) {
        let maxBoardEval = -Infinity;
        let bestMove = null;
        for(const move of possibleMoves(tempBoard)) {
            let newTempBoard = [...tempBoard];
            newTempBoard[move] = player;

            const moveEval = (minmax(
                newTempBoard, 
                mainPlayer, 
                getOtherPlayer(player, players), 
                players, 
                false,
                move
            )).score;
        
            maxBoardEval = max(maxBoardEval, moveEval);
            bestMove = moveEval >= maxBoardEval ? move : bestMove;

            // Short circuit here
            if (maxBoardEval >= expectedMaxVal) {
                return {
                    score: maxBoardEval,
                    move: bestMove
                };
            }
        }

        return {
            score: maxBoardEval,
            move: bestMove
        };

    } else {
        let minBoardEval = +Infinity;
        let bestMove = null;
        for(const move of possibleMoves(tempBoard)) {
            let newTempBoard = [...tempBoard];
            newTempBoard[move] = player;

            const moveEval = (minmax(
                newTempBoard, 
                mainPlayer, 
                getOtherPlayer(player, players), 
                players, 
                true,
                parentMove
            )).score;

            minBoardEval = min(minBoardEval, moveEval);
            bestMove = moveEval <= minBoardEval ? move : bestMove;

            // Short-circuit here
            if (minBoardEval <= expectedMinVal) {
                return {
                    score: minBoardEval,
                    move: bestMove
                };
            }
        }

        return {
            score: minBoardEval,
            move: bestMove
        };    
    }
    
}