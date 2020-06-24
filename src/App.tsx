import React from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import { Box } from '@material-ui/core';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';
import Controls from './views/Controls';
import Spellbook from './views/Spellbook';
import TopBar from './views/TopBar';
import Overlays from './views/Overlays';
import { configureAppStore } from './store/store';

function App() {
    const appStore = configureAppStore();
    return (
        <Provider store={appStore.store}>
            <PersistGate persistor={appStore.persistor}>
                <CssBaseline />
                <div className="App">
                    <Helmet>
                        <title>
                            {process.env.NODE_ENV === 'development'
                                ? '[DEV] SpellStudio'
                                : 'SpellStudio'}
                        </title>
                    </Helmet>
                    <Box className="TopBar">
                        <TopBar />
                    </Box>
                    <Controls />
                    <Spellbook />
                    <Overlays />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
