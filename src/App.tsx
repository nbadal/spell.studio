import React from 'react';

import './App.css';
import Controls from "./views/Controls";
import Spellbook from "./views/Spellbook";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header><h1>Spell Studio</h1></header>
                <div className="content">
                    <Controls/>
                    <Spellbook/>
                </div>
            </div>
        );
    }
}

export default App;
