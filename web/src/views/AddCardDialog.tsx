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
import { hideModals, showModal } from '../store/modals';
import { DialogTitleWithClose } from './DialogTitleWithClose';

export const AddCardDialog = () => {
    const openModal = useSelector((state: RootState) => state.modals.openModal);
    const dispatch = useDispatch();
    const onClose = () => dispatch(hideModals());

    interface ButtonProps {
        icon: React.ReactNode,
        labelText: string,
        onClick: () => void,
    }

    const ButtonItem = (props: ButtonProps) => (
        <Box className="AddButton" onClick={props.onClick}>
            <Box className="AddButtonIcon">{props.icon}</Box>
            <span className="AddButtonLabel">{props.labelText}</span>
        </Box>
    );

    return (
        <Dialog maxWidth="lg" fullWidth open={openModal === 'add-card'} onClose={onClose}>
            <DialogTitleWithClose onClose={onClose}>Add Cards</DialogTitleWithClose>
            <DialogContent>
                <Box className="AddButtons">
                    <ButtonItem
                        icon={<ImportContactsIcon fontSize="large" />}
                        labelText="Import example cards (D&D 5e SRD)"
                        onClick={() => dispatch(showModal('post-import'))}
                    />
                    <ButtonItem
                        icon={<InsertDriveFileIcon fontSize="large" />}
                        labelText="Import cards from file"
                        onClick={() => {}}
                    />
                    <ButtonItem
                        icon={<CodeIcon fontSize="large" />}
                        labelText="Import cards from JSON"
                        onClick={() => {}}
                    />
                    <ButtonItem
                        icon={<AddIcon fontSize="large" />}
                        labelText="Add card manually"
                        onClick={() => {}}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};
