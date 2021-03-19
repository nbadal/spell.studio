import React from 'react';
import '../css/AddCardDialog.css';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import CodeIcon from '@material-ui/icons/Code';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { hideModals } from '../store/modals';
import { DialogTitleWithClose } from './DialogTitleWithClose';

export const AddCardDialog = () => {
    const openModal = useSelector((state: RootState) => state.modals.openModal);
    const dispatch = useDispatch();
    const onClose = () => dispatch(hideModals());
    return (
        <Dialog maxWidth="lg" fullWidth open={openModal === 'add-card'} onClose={onClose}>
            <DialogTitleWithClose onClose={onClose}>Add Cards</DialogTitleWithClose>
            <DialogContent>
                <Box className="AddButtons">
                    <Box className="AddButton">
                        <Box className="AddButtonIcon"><ImportContactsIcon fontSize="large" /></Box>
                        <span className="AddButtonLabel">Import example cards (D&D 5e SRD)</span>
                    </Box>
                    <Box className="AddButton">
                        <Box className="AddButtonIcon"><InsertDriveFileIcon fontSize="large" /></Box>
                        <span className="AddButtonLabel">Import cards from file</span>
                    </Box>
                    <Box className="AddButton">
                        <Box className="AddButtonIcon"><CodeIcon fontSize="large" /></Box>
                        <span className="AddButtonLabel">Import cards from JSON</span>
                    </Box>
                    <Box className="AddButton">
                        <Box className="AddButtonIcon"><AddIcon fontSize="large" /></Box>
                        <span className="AddButtonLabel">Add card manually</span>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
