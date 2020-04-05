import React from 'react';
import Helmet from "react-helmet";

import './App.css';
import Controls from "./views/Controls";
import Spellbook from "./views/Spellbook";
import TopBar from "./views/TopBar";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Helmet>
                    <title>{process.env.NODE_ENV === "development" ? "[DEV] SpellStudio" : "SpellStudio"}</title>
                </Helmet>
                <TopBar/>
                <div className="content">
                    <Controls/>
                    <Spellbook/>
                </div>
            </div>
        );
    }
}

export default App;
