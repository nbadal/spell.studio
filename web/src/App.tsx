import React from 'react';
import { Helmet } from 'react-helmet';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    HashRouter, Route, Routes, useHref,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TopBar } from './views/TopBar';
import { Overlays } from './views/Overlays';
import { PrintSpellbook } from './views/PrintSpellbook';
import { CardToolbar } from './views/CardToolbar';
import { Spellbook } from './views/Spellbook';
import { CaptureHotkeys } from './views/CaptureHotkeys';

import './App.css';

export function App() {
    return (
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
    );
}

const theme = createTheme();

function Home() {
    const printHref = useHref('/print');
    const onPrintHotkey = () => {
        window.open(printHref, '_blank');
    };

    return (
        <CaptureHotkeys onPrintHotkey={onPrintHotkey}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Box className="TopBar">
                        <TopBar />
                    </Box>
                    <CardToolbar />
                    <Spellbook />
                    <Overlays />
                </div>
            </ThemeProvider>
        </CaptureHotkeys>
    );
}
