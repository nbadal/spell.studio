import React from 'react';

import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { DialogTitleWithClose } from './DialogTitleWithClose';
import { AddCardButtons } from './AddCardButtons';
import { closeModals } from '../store/modals/actions';

export function AddCardDialog() {
    const openModal = useSelector((state: RootState) => state.modals.openModal);
    const dispatch = useDispatch();
    const onClose = () => dispatch(closeModals());

    return (
        <Dialog maxWidth="lg" fullWidth open={openModal === 'add-card'} onClose={onClose}>
            <DialogTitleWithClose onClose={onClose}>Add Cards</DialogTitleWithClose>
            <DialogContent>
                <AddCardButtons />
            </DialogContent>
        </Dialog>
    );
}
