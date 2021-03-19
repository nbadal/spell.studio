import React from 'react';
import '../css/PostImportDialog.css';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import DialogContentText from '@material-ui/core/DialogContentText';
import { RootState } from '../store';
import { hideModals } from '../store/modals';
import { DialogTitleWithClose } from './DialogTitleWithClose';

export const PostImportDialog = () => {
    const openModal = useSelector((state: RootState) => state.modals.openModal);
    const dispatch = useDispatch();
    const onClose = () => dispatch(hideModals());
    return (
        <Dialog maxWidth="lg" fullWidth open={openModal === 'post-import'} onClose={onClose}>
            <DialogTitleWithClose onClose={onClose}>Post Import</DialogTitleWithClose>
            <DialogContent>
                <DialogContentText>
                    TODO: UI for filtering incoming? color assignment? etc.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};
