import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TomareState } from "../../src/types/tomare";

const initialState: TomareState = {
    menu: '',
    gappi: '',
    uid: '',
    am_pm: '',
    make: false,
    nail: false,
    este: false,
    sonota: '',
    img_befor: '',
    img_after: '',
    tanka: 0,
} as TomareState;

export const targetTomareSlice = createSlice({
    name: 'targetTomare',
    initialState,
    reducers: {
        addTargetTomare: (state, action) => {
            state.tomare = action.payload
            state.menu = action.payload.menu
            state.gappi = action.payload.gappi
            state.uid = action.payload.uid
            state.make = action.payload.make
            state.nail = action.payload.nail
            state.este = action.payload.este
            state.sonota = action.payload.sonota
            state.am_pm = action.payload.am_pm
            state.img_befor = action.payload.img_befor
            state.img_after = action.payload.img_after
            state.tanka = action.payload.tanka
        }
    },
});

export const { addTargetTomare } = targetTomareSlice.actions;
export const selectTargetTomare = (state: RootState) => state.targetTomare;
export default targetTomareSlice.reducer;
