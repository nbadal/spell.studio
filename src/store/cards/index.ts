import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardsState } from "./types";

const initialCardsState: CardsState = {
    selectedTitles: [],
};

const cardsSlice = createSlice({
    name: "cards",
    initialState: initialCardsState,
    reducers: {
        selectCard: (state, action: PayloadAction<Card>) => {
            state.selectedTitles = [action.payload.title, ...state.selectedTitles];
        },
        unselectCard: (state, action: PayloadAction<Card>) => {
            // We use `title` because the object will be proxied so === wont work.
            state.selectedTitles = state.selectedTitles.filter(
                (title) => title !== action.payload.title,
            );
        },
        clearSelection: (state) => {
            state.selectedTitles = [];
        },
    },
});

export const { selectCard, unselectCard, clearSelection } = cardsSlice.actions;

export default cardsSlice.reducer;
