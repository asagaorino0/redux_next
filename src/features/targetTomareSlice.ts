import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TomareState } from "../../src/types/tomare";

const initialState: TomareState = {
    menu: '',
    gappi: '',
    tomareId: '',
    uid: '',
    am_pm: '',
    make: false,
    nail: false,
    este: false,
    sonota: '',
} as TomareState;

export const targetTomareSlice = createSlice({
    name: 'targetTomare',
    initialState,
    reducers: {
        addTargetTomare: (state, action) => {
            state.menu = action.payload.menu
            state.gappi = action.payload.gappi
            state.uid = action.payload.uid
            state.tomareId = action.payload.tpmareId
            state.make = action.payload.make
            state.nail = action.payload.nail
            state.este = action.payload.este
            state.sonota = action.payload.sonota
            state.am_pm = action.payload.am_pm
        }
    },
});

export const { addTargetTomare } = targetTomareSlice.actions;
export const selectTargetTomare = (state: RootState) => state.targetTomare;
export default targetTomareSlice.reducer;
