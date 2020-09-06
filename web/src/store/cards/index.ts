import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, CardsState } from './types';

const initialCardsState: CardsState = {
    selectedUids: [],
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialCardsState,
    reducers: {
        selectCard: (state, action: PayloadAction<Card>) => {
            state.selectedUids = [action.payload.uid, ...state.selectedUids];
        },
        unselectCard: (state, action: PayloadAction<Card>) => {
            // We use the unique id because the object will be proxied so === wont work.
            state.selectedUids = state.selectedUids.filter(
                (title) => title !== action.payload.uid,
            );
        },
        clearSelection: (state) => {
            state.selectedUids = [];
        },
    },
});

export const { selectCard, unselectCard, clearSelection } = cardsSlice.actions;

export default cardsSlice.reducer;
