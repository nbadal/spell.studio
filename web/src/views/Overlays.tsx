import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import PrintIcon from '@mui/icons-material/Print';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { selectFilteredCards } from '../store/cards/selectors';
import { clearSelection } from '../store/cards';
import { AddCardDialog } from './AddCardDialog';
import { PostImportDialog } from './PostImportDialog';
import { ImportJsonDialog } from './ImportJsonDialog';

export function Overlays() {
    const dispatch = useDispatch();

    const { selectedCount, multiSelect, spellCount } = useSelector((state: RootState) => ({
        spellCount: selectFilteredCards(state).length,
        multiSelect: state.cards.multiSelect,
        selectedCount: state.cards.selectedUids.length,
    }));

    return (
        <Box displayPrint="none">
            <Snackbar
                open={multiSelect && selectedCount > 0}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                message={
                    `Selected: ${selectedCount} / ${spellCount}`
                }
                action={(
                    <Button color="secondary" size="small" onClick={() => dispatch(clearSelection())}>CLEAR</Button>
                )}
            />
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
