import useGame from "../hooks/useGame.js";

const GameReducer = (state, action) => {

    const { getNextPlayer, getRandomPlayer, playBoard } = useGame();
    const { type, payload } = action;

    switch (type) {
        case 'START_GAME':
            return {
                ...state,
                currentState: 'ON',
                nextPlayer: getRandomPlayer(state.players),
                timer: payload.timerId
            };

        case 'UPDATE_BOARD':
            return {
                ...state,
                board: playBoard(state.board, payload.boxIndex, payload.player)
            };

        case 'UPDATE_NEXT_PLAYER':
            return {
                ...state,
                nextPlayer: getNextPlayer(state.players, state.nextPlayer)
            };

        case 'UPDATE_PLAYTIME_LEFT':
            return {
                ...state,
                playTimeLeft: payload.playTimeLeft
            }

        case 'PLAY_MOVE':
            return {
                ...state,
                board: playBoard(state.board, payload.boxIndex, payload.player),
                nextPlayer: getNextPlayer(state.players, state.nextPlayer)
            };

        case 'RESET_TIMER':
            return {
                ...state,
                playTimeLeft: payload.playTimeLeft,
                timer: payload.timerId
            }

        case 'RESTART_GAME':
            return payload.initialGameState;

        case 'GAME_OVER':
            return {
                ...state,
                currentState: 'OVER',
                timer: null
            }

        default:
            return state;
    }
}

export default GameReducer;