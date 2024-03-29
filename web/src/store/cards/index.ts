import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, CardsState } from './types';
import { addCards } from './actions';

const initialCardsState: CardsState = {
    all: [],
    selectedUids: [],
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialCardsState,
    reducers: {
        selectCardUid: (state, action: PayloadAction<string>) => {
            state.selectedUids = [...state.selectedUids, action.payload];
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
        resetCards: () => initialCardsState,
    },
    extraReducers: (builder) => {
        builder.addCase(addCards, (state, action) => {
            state.all.push(...action.payload);
        });
    },
});

export const {
    selectCardUid, unselectCard, clearSelection, resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
