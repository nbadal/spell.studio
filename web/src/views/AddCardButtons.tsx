import React from 'react';
import '../css/AddCardButtons.css';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import { allSRDSpells } from '../store/import';
import { importCards } from '../store/import/actions';

export const AddCardButtons = () => {
    const dispatch = useDispatch();

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
        <Box className="AddButtons">
            <ButtonItem
                icon={<ImportContactsIcon fontSize="large" />}
                labelText="Import example cards (D&D 5e SRD)"
                onClick={() => dispatch(importCards(allSRDSpells))}
            />
            <ButtonItem
                icon={<InsertDriveFileIcon fontSize="large" />}
                labelText="Import cards from file"
                onClick={() => {
                }}
            />
            <ButtonItem
                icon={<CodeIcon fontSize="large" />}
                labelText="Import cards from JSON"
                onClick={() => {
                }}
            />
            <ButtonItem
                icon={<AddIcon fontSize="large" />}
                labelText="Add card manually"
                onClick={() => {
                }}
            />
        </Box>
    );
};
