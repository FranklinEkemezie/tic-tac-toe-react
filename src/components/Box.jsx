import boxStyles from '../assets/styles/box.module.css';
import oImg from '../assets/imgs/o-img.png';
import xImg from '../assets/imgs/x-img.png';
import noMoveImg from '../assets/imgs/no-move.png';


function Box() {

    return (
        <div className={boxStyles.box}>
            {/*<img src={xImg} alt="Player"/>*/}
            <img src={oImg} alt="Player"/>
            {/*<img src={noMoveImg} alt="No move"/>*/}
        </div>
    );
}

export default Box;