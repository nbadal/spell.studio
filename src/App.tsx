import React from "react";
import { Helmet } from "react-helmet";

import "./App.css";
import Controls from "./views/Controls";
import Spellbook from "./views/Spellbook";
import TopBar from "./views/TopBar";
import Overlays from "./views/Overlays";
import {Box} from "@material-ui/core";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Helmet>
                    <title>
                        {process.env.NODE_ENV === "development"
                            ? "[DEV] SpellStudio"
                            : "SpellStudio"}
                    </title>
                </Helmet>
                <Box className={"TopBar"}><TopBar /></Box>
                <Controls />
                <Spellbook />
                <Overlays />
            </div>
        );
    }
}

export default App;
