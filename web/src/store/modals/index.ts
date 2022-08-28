import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpenAppModal, ModalsState, Activity } from './types';
import { closeModals } from './actions';
import { addCards } from '../cards/actions';

const initialModalsState: ModalsState = {
    openModal: null,
    openActivity: null,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState: initialModalsState,
    reducers: {
        showModal: (state, action: PayloadAction<OpenAppModal>) => {
            state.openModal = action.payload;
        },
        showActivity: (state, action: PayloadAction<Activity|null>) => {
            state.openActivity = action.payload;
        },
    },
    extraReducers: (builder) => {
        const closeModalsReducer = (state: ModalsState) => {
            state.openModal = null;
        };

        builder
            .addCase(closeModals, closeModalsReducer)
            .addCase(addCards, closeModalsReducer);
    },
});

export const { showModal, showActivity } = modalsSlice.actions;

export default modalsSlice.reducer;
