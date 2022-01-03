import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import PrintIcon from '@material-ui/icons/Print';
import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { RootState } from '../store';
import { selectFilteredCards } from '../store/cards/selectors';
import { clearSelection } from '../store/cards';
import { AddCardDialog } from './AddCardDialog';
import { PostImportDialog } from './PostImportDialog';
import { ImportJsonDialog } from './ImportJsonDialog';

const useStyles = makeStyles((theme: Theme) => createStyles({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

export function Overlays() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { selectedCount, multiSelect, spellCount } = useSelector((state: RootState) => ({
        spellCount: selectFilteredCards(state).length,
        multiSelect: state.cards.multiSelect,
        selectedCount: state.cards.selectedUids.length,
    }));

    return (
        <Box className="Overlays" displayPrint="none">
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
            <Fab className={classes.fab} component={Link} to="/print" target="_blank">
                <PrintIcon color="primary" />
            </Fab>
            <AddCardDialog />
            <PostImportDialog />
            <ImportJsonDialog />
        </Box>
    );
}
