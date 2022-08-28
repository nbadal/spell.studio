import React from 'react';
import '../css/AddCardButtons.css';

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CodeIcon from '@mui/icons-material/Code';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useFilePicker } from 'use-file-picker';
import { allSRDSpells, importJsonChanged } from '../store/import';
import { showModal } from '../store/modals';
import { RootState } from '../store';
import {addCards} from "../store/cards/actions";

export function AddCardButtons() {
    const dispatch = useDispatch();

    const { cardCount } = useSelector((state: RootState) => ({
        cardCount: state.cards.all.length,
    }));

    const [openFileSelector, fp] = useFilePicker({
        accept: 'application/json',
        multiple: false,
    });

    if (fp.filesContent && fp.filesContent[0]) {
        dispatch(importJsonChanged(fp.filesContent[0].content));
        dispatch(showModal('import-json'));
        fp.clear();
    }

    return (
        <Box className="AddButtons">
            {cardCount === 0 && (
                <ButtonItem
                    icon={<ImportContactsIcon fontSize="large" />}
                    labelText="Import example cards (D&D 5e SRD)"
                    onClick={() => dispatch(addCards(allSRDSpells))}
                />
            )}
            <ButtonItem
                icon={<FolderOpenIcon fontSize="large" />}
                labelText="Import cards from file"
                onClick={() => {
                    openFileSelector();
                }}
            />
            <ButtonItem
                icon={<CodeIcon fontSize="large" />}
                labelText="Import cards from JSON"
                onClick={() => {
                    dispatch(showModal('import-json'));
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
}

interface ButtonProps {
    icon: React.ReactNode,
    labelText: string,
    onClick: () => void,
}

function ButtonItem(props: ButtonProps) {
    return (
        <Box className="AddButton" onClick={props.onClick}>
            <Box className="AddButtonIcon">{props.icon}</Box>
            <span className="AddButtonLabel">{props.labelText}</span>
        </Box>
    );
}
