import React, { useState } from 'react';
import '../css/PostImportDialog.css';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import { RootState } from '../store';
import { DialogTitleWithClose } from './DialogTitleWithClose';
import { closeModals } from '../store/modals/actions';
import { addCards } from '../store/cards/actions';
import { CardList } from './CardList';

export const PostImportDialog = () => {
    const { openModal, importCards } = useSelector((state: RootState) => ({
        openModal: state.modals.openModal,
        importCards: state.imports.importedCards,
    }));
    const allUids = importCards.map((card) => card.uid);
    const [selectedCards, setSelectedCards] = useState(new Set(allUids));
    const dispatch = useDispatch();

    const onClose = () => dispatch(closeModals());
    const onOkClick = () => dispatch(addCards(
        importCards.filter((card) => selectedCards.has(card.uid)),
    ));

    return (
        <Dialog maxWidth="lg" fullWidth open={openModal === 'post-import'} onClose={onClose}>
            <DialogTitleWithClose onClose={onClose}>Post Import</DialogTitleWithClose>
            <DialogContent>
                <Box className="DialogContent">
                    <Button onClick={() => setSelectedCards(new Set())}>Clear</Button>
                    <Button onClick={() => setSelectedCards(new Set(allUids))}>All</Button>
                    <CardList
                        width={350}
                        height={500}
                        cards={importCards}
                        selectedCards={selectedCards}
                        onCardSelected={(cardUid, selected) => {
                            const selection = selectedCards;
                            if (selected) {
                                selection.add(cardUid);
                            } else {
                                selection.delete(cardUid);
                            }
                            setSelectedCards(new Set(selection));
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onOkClick}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};
