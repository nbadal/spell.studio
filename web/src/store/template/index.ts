import { createSlice } from '@reduxjs/toolkit';
import { TemplateState } from './types';

const initialLayoutState: TemplateState = {
    selectedTemplate: 'standard',
};

const templateSlice = createSlice({
    name: 'layout',
    initialState: initialLayoutState,
    reducers: {
        resetTemplate: () => initialLayoutState,
    },
});

export const { resetTemplate } = templateSlice.actions;

export default templateSlice.reducer;
