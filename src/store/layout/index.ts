import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutState } from './types';

const initialLayoutState: LayoutState = {
    showFront: true,
    showBack: true,
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState: initialLayoutState,
    reducers: {
        setFrontShown: (state, action: PayloadAction<boolean>) => {
            state.showFront = action.payload;
        },
        setBackShown: (state, action: PayloadAction<boolean>) => {
            state.showBack = action.payload;
        },
    },
});

export const { setFrontShown, setBackShown } = layoutSlice.actions;

export default layoutSlice.reducer;
