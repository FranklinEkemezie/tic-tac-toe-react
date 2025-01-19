import boxStyles from '../assets/styles/box.module.css';
import oImg from '../assets/imgs/o-img.png';
import xImg from '../assets/imgs/x-img.png';
import noMoveImg from '../assets/imgs/no-move.png';
import {useContext} from "react";
import GameContext from "../contexts/gameContext.jsx";

// eslint-disable-next-line react/prop-types
function Box({ boxIndex, highlight }) {

    const { 
        currentState, nextPlayer, board, playMove, resetTimer 
    } = useContext(GameContext);

    const playedBy = board[boxIndex];
    const boxNumber = boxIndex + 1;

    const handleBoxClick = () => {
        if (currentState !== 'ON') return;
        if (! playedBy) {
            playMove(boxIndex, nextPlayer);
            resetTimer();

            return;
        }

        alert(`Box ${boxNumber} played already`);
    };

    const playerCards = {
        'X':    {src: xImg,     name: 'Player X'},
        'O':    {src: oImg,     name: 'Player O'},
        null:   {src: noMoveImg,name: ''}
    };

    const { src, name } = playerCards[playedBy];

    return (
        <div 
            className={`${boxStyles.box} ${highlight ? boxStyles.highlight : ''}`} 
            onClick={handleBoxClick}
        >
            <span className={boxStyles.boxIndex}>{boxNumber}</span>
            <img src={src} alt={name} width="96" height="96" />
        </div>
    );
}

export default Box;