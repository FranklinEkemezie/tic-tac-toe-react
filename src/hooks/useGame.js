import { minmax } from "./useMinimax";

const useGame = () => ({

    getRandomPlayer(players) {
        return (
            (Object.values(players).sort(() => Math.random() - 0.5))[0]
        );
    },

    getNextPlayer(players, prevPlayer) {
        return (
            Object.values(players).find(player => player !== prevPlayer)
        );
    },

    playBoard(board, index, player) {
        const newBoard = [...board];
        newBoard[index] = player;

        return newBoard;
    },

    getBoardSummary(board, players) {
        const winCombos = {
            rows:       ['012', '345', '678'],
            columns:    ['036', '147', '258'],
            diagonals:  ['048', '246']
        };

        const boardSummary = {};
        for (const player in players) {
            boardSummary[player] = {
                moves: {},
                win: {
                    combo: null,        // e.g. '012', '246'
                    direction: null     // e.g. 'diagonals'
                }
            };

            for (const direction in winCombos) {
                boardSummary[player]['moves'][direction] = [];

                for (const combo of winCombos[direction]) {
                    const playerDirectionCombo = combo.split('').map(e => {
                        const index = +e;
                        return (board[index] === players[player]) ? index : ' ';
                    }).join('');
                    boardSummary[player]['moves'][direction].push(playerDirectionCombo);

                    if (
                        // record the first time the player has won
                        ! boardSummary[player]['win'].combo &&
                        playerDirectionCombo === combo
                    ) {
                        boardSummary[player]['win'] = {
                            combo, direction
                        };
                    }
                }
            }
        }

        return boardSummary;
    },

    getWinner(boardSummary) {

        for (const player in boardSummary) {
            const { win } = boardSummary[player];
            if (win.combo) {
                return {
                    player,
                    ...win
                };
            }
        }

        return null;
    },

    getOtherPlayer(player, players) {
        return Object.values(players).find(p => p !== player);
    },

    isBoardFull(board) {
        return board.every(e => e);
    },

    startTimer(interval, timerCallback) {
        return setInterval(timerCallback, interval);
    },

    stopTimer(timerId) {
        clearInterval(timerId);
    },

    suggestMove(board, moveSuggestionAlgo) {

        return moveSuggestionAlgo(board);
    },

    getRandomMove(board) {

        const emptyPositions = [...board]
            .map((e, i) => ({e, i: i + 1}))
            .filter(v => ! v.e)
            .map(v => v.i)
        ;

        if (! emptyPositions.length) {
            return null;
        }

        return (emptyPositions.sort(() => Math.random() - .5))[0];
    },

    getMinmaxMove(board, player, players) { 

        return minmax(board, player, player, players).move;
    }
});


export default useGame;