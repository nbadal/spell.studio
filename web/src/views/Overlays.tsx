import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import PrintIcon from '@mui/icons-material/Print';
import React from 'react';
import { Link } from 'react-router-dom';
import { AddCardDialog } from './AddCardDialog';
import { PostImportDialog } from './PostImportDialog';
import { ImportJsonDialog } from './ImportJsonDialog';

export function Overlays() {
    return (
        <Box displayPrint="none">
            <Fab
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
                component={Link}
                to="/print"
                target="_blank"
            >
                <PrintIcon color="primary" />
            </Fab>
            <AddCardDialog />
            <PostImportDialog />
            <ImportJsonDialog />
        </Box>
    );
}
