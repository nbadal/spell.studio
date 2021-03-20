import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpenAppModal, ModalsState } from './types';
import { setImportedCards } from '../import/actions';
import { closeModals } from './actions';
import { addCards } from '../cards/actions';

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
    },
    extraReducers: (builder) => {
        const closeModalsReducer = (state: ModalsState) => {
            state.openModal = null;
        };

        builder
            .addCase(setImportedCards, (state) => {
                state.openModal = 'post-import';
            })
            .addCase(closeModals, closeModalsReducer)
            .addCase(addCards, closeModalsReducer);
    },
});

export const { showModal } = modalsSlice.actions;

export default modalsSlice.reducer;
