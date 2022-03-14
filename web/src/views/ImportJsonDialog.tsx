import React from 'react';

import AceEditor from 'react-ace';
// import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import { RootState } from '../store';
import { DialogTitleWithClose } from './DialogTitleWithClose';
import { closeModals } from '../store/modals/actions';
import { importJsonChanged } from '../store/import';
import { selectParsedJsonCards } from '../store/import/selectors';
import { setImportedCards } from '../store/import/actions';

export function ImportJsonDialog() {
    const dispatch = useDispatch();
    const { openModal, importJson, jsonResults } = useSelector((state: RootState) => ({
        openModal: state.modals.openModal,
        importJson: state.imports.json,
        jsonResults: selectParsedJsonCards(state),
    }));
    const [jsonType, jsonCards] = jsonResults;

    const onClose = () => {
        dispatch(closeModals());
        dispatch(importJsonChanged(''));
    };

    const doImport = () => {
        dispatch(setImportedCards(jsonCards));
        dispatch(importJsonChanged(''));
    };

    return (
        <Dialog maxWidth="lg" fullWidth open={openModal === 'import-json'} onClose={onClose}>
            <DialogTitleWithClose onClose={onClose}>Import JSON</DialogTitleWithClose>
            <DialogContent>
                <AceEditor
                    width="100%"
                    mode="json"
                    theme="monokai"
                    showPrintMargin={false}
                    setOptions={{ useWorker: false }}
                    value={importJson}
                    onChange={(text) => dispatch(importJsonChanged(text))}
                />
                <b>{`Found Type: ${jsonType} and ${jsonCards.length} cards`}</b>
            </DialogContent>
            <DialogActions>
                <Button disabled={jsonCards.length === 0} onClick={() => doImport()}>Import</Button>
            </DialogActions>
        </Dialog>
    );
}
