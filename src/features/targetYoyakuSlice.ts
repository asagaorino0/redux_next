import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TargetYoyakuState } from "../../src/types/targetYoyaku";

const initialState: TargetYoyakuState = {
    menu: '',
    gappi: '',
    uid: '',
    am_pm: '',
    make: false,
    nail: false,
    este: false,
    sonota: '',
} as TargetYoyakuState;

export const targetYoyakuSlice = createSlice({
    name: 'targetTomare',
    initialState,
    reducers: {
        addTargetYoyaku: (state, action) => {
            state.targetYoyaku = action.payload
            state.menu = action.payload.menu
            state.gappi = action.payload.gappi
            state.uid = action.payload.uid
            state.make = action.payload.make
            state.nail = action.payload.nail
            state.este = action.payload.este
            state.sonota = action.payload.sonota
            state.am_pm = action.payload.am_pm
        }
    },
});

export const { addTargetYoyaku } = targetYoyakuSlice.actions;
export const selectTargetTomare = (state: RootState) => state.targetTomare;
export default targetYoyakuSlice.reducer;
