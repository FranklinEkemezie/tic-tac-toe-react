import './App.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import GameContextProvider from "./contexts/gameContextProvider.jsx";
import GameControlCentre from './components/GameControlCentre.jsx';

function App() {
    return (
        <div className="App">
            <GameContextProvider>
                <GameControlCentre>
                    <Header />
                    <Main />
                    <Footer />
                </GameControlCentre>
            </GameContextProvider>
        </div>
    );
}

export default App
