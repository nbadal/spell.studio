import React from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import Box from '@material-ui/core/Box';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Spellbook from './views/Spellbook';
import TopBar from './views/TopBar';
import Overlays from './views/Overlays';
import { configureAppStore } from './store';
import PrintSpellbook from './views/PrintSpellbook';
import { CardToolbar } from './views/CardToolbar';

export const App = () => {
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
                    <Switch>
                        <Route path="/print">
                            <PrintSpellbook />
                        </Route>
                        <Route path="/">
                            <div className="App">
                                <Box className="TopBar">
                                    <TopBar />
                                </Box>
                                <CardToolbar />
                                <Spellbook />
                                <Overlays />
                            </div>
                        </Route>
                    </Switch>
                </HashRouter>
            </PersistGate>
        </Provider>
    );
};
