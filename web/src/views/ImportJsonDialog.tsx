import React from 'react';

import AceEditor from 'react-ace';
// import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { DialogTitleWithClose } from './DialogTitleWithClose';
import { closeModals } from '../store/modals/actions';
import { importJsonChanged } from '../store/import';
import { selectImportJsonType } from '../store/import/selectors';

export const ImportJsonDialog = () => {
    const { openModal, importJson, jsonType } = useSelector((state: RootState) => ({
        openModal: state.modals.openModal,
        importJson: state.imports.json,
        jsonType: selectImportJsonType(state),
    }));
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(closeModals());
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
                <b>{`Found Type: ${jsonType}`}</b>
            </DialogContent>
        </Dialog>
    );
};
