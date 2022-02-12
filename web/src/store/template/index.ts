import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemplateState } from './types';
import { defaultTemplate } from '../../templates';

const initialLayoutState: TemplateState = {
    frontHbs: defaultTemplate.front,
    backHbs: defaultTemplate.back,
    styleCss: defaultTemplate.css,
};

const templateSlice = createSlice({
    name: 'layout',
    initialState: initialLayoutState,
    reducers: {
        setFrontTemplate: (state, action: PayloadAction<string>) => {
            state.frontHbs = action.payload;
        },
        setBackTemplate: (state, action: PayloadAction<string>) => {
            state.backHbs = action.payload;
        },
        setStyle: (state, action: PayloadAction<string>) => {
            state.backHbs = action.payload;
        },
        resetTemplate: () => initialLayoutState,
    },
});

export const { setFrontTemplate, setBackTemplate, resetTemplate } = templateSlice.actions;

export default templateSlice.reducer;
