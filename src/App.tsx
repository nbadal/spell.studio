import React from 'react';
import Helmet from "react-helmet";

import './App.css';
import Controls from "./views/Controls";
import Spellbook from "./views/Spellbook";
import TopBar from "./views/TopBar";
import Overlays from "./views/Overlays";

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
                    <Overlays />
                </div>
            </div>
        );
    }
}

export default App;
