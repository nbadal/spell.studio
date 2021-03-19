import React from 'react';
import '../css/PostImportDialog.css';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { DialogActions } from '@material-ui/core';
import { RootState } from '../store';
import { DialogTitleWithClose } from './DialogTitleWithClose';
import { closeModals } from '../store/modals/actions';
import { addCards } from '../store/cards/actions';

export const PostImportDialog = () => {
    const { openModal, importCards } = useSelector((state: RootState) => ({
        openModal: state.modals.openModal,
        importCards: state.imports.importedCards,
    }));
    const dispatch = useDispatch();
    const onClose = () => dispatch(closeModals());
    return (
        <Dialog maxWidth="lg" fullWidth open={openModal === 'post-import'} onClose={onClose}>
            <DialogTitleWithClose onClose={onClose}>Post Import</DialogTitleWithClose>
            <DialogContent>
                <DialogContentText>
                    TODO: UI for filtering incoming? color assignment? etc.
                </DialogContentText>
                <DialogContentText>{`There are ${importCards.length} spells.`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(addCards(importCards))}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};
