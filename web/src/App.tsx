import React from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import Box from '@material-ui/core/Box';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import TopBar from './views/TopBar';
import { Overlays } from './views/Overlays';
import { configureAppStore } from './store';
import PrintSpellbook from './views/PrintSpellbook';
import { CardToolbar } from './views/CardToolbar';
import { Spellbook } from './views/Spellbook';

export function App() {
    const appStore = configureAppStore();

    return (
        <Provider store={appStore.store}>
            <PersistGate persistor={appStore.persistor}>
                <HashRouter>
                    <CssBaseline />
                    <Helmet>
                        <title>
                            {process.env.NODE_ENV === 'development'
                                ? '[DEV] SpellStudio'
                                : 'SpellStudio'}
                        </title>
                    </Helmet>
                    <Routes>
                        <Route path="/print" element={<PrintSpellbook />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </HashRouter>
            </PersistGate>
        </Provider>
    );
}

function Home() {
    return (
        <div className="App">
            <Box className="TopBar">
                <TopBar />
            </Box>
            <CardToolbar />
            <Spellbook />
            <Overlays />
        </div>
    );
}
