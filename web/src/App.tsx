import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {
    HashRouter, Route, Routes, useHref,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import { TopBar } from './views/TopBar';
import { Overlays } from './views/Overlays';
import { PrintSpellbook } from './views/PrintSpellbook';
import { CardToolbar } from './views/CardToolbar';
import { Spellbook } from './views/Spellbook';
import { CaptureHotkeys } from './views/CaptureHotkeys';

import './App.css';

export function App() {
    useEffect(() => {
        document.title = process.env.NODE_ENV === 'development'
            ? '[DEV] SpellStudio' : 'SpellStudio';
    });

    return (
        <HashRouter>
            <CssBaseline />
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
