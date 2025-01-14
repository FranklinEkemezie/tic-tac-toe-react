import footerStyles from '../assets/styles/footer.module.css';

function Footer() {

    return (
        <div className={footerStyles.footer}>
            <div>
                <button className={footerStyles.resetBtn}>Reset Game</button>
            </div>
            <div>
                <button className={footerStyles.suggestBtn}>Suggest Move</button>

            </div>
        </div>
    )
}

export default Footer;