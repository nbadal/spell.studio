import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutState } from './types';

const initialLayoutState: LayoutState = {
    cornerRadius: 0.125,
    bleed: undefined,
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState: initialLayoutState,
    reducers: {
        setCornerRadius: (state, action: PayloadAction<number>) => {
            state.cornerRadius = action.payload;
        },
        disableCornerRadius: (state) => {
            state.cornerRadius = undefined;
        },
        setBleed: (state, action: PayloadAction<number>) => {
            state.bleed = action.payload;
        },
        disableBleed: (state) => {
            state.bleed = undefined;
        },
        resetLayout: () => initialLayoutState,
    },
});

export const {
    setCornerRadius, disableCornerRadius, setBleed, disableBleed, resetLayout,
} = layoutSlice.actions;

export default layoutSlice.reducer;
