import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpenAppModal, ModalsState } from './types';

const initialModalsState: ModalsState = {
    openModal: null,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState: initialModalsState,
    reducers: {
        showModal: (state, action: PayloadAction<OpenAppModal>) => {
            state.openModal = action.payload;
        },
        hideModals: () => initialModalsState,
    },
});

export const { showModal, hideModals } = modalsSlice.actions;

export default modalsSlice.reducer;
