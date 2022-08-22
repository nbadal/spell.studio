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
        duplicateCard: (state, action: PayloadAction<Card>) => {
            const newCard = { ...action.payload };
            newCard.uid = Math.random().toString(36);

            const idx = state.all.findIndex((card) => card.uid === action.payload.uid);
            state.all = [...state.all.slice(0, idx), newCard, ...state.all.slice(idx)];
        },
        deleteCard: (state, action: PayloadAction<Card>) => {
            state.all = state.all.filter((card) => card.uid !== action.payload.uid);
        },
        selectCard: (state, action: PayloadAction<Card>) => {
            state.selectedUids = [...state.selectedUids, action.payload.uid];
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
    duplicateCard, deleteCard, selectCard, unselectCard, clearSelection, resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
