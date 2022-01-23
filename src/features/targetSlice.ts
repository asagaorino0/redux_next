import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TargetState } from "../../src/types/target";

const initialState: TargetState = {
    target: '',
    yoyakuId: '',
    tomareId: ''
} as TargetState;

export const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
        addTarget: (state, action) => {
            state.target = action.payload
            state.yoyakuId = action.payload.yoyakuId
            state.tomareId = action.payload.tomareId
        }
    },
});

export const { addTarget } = targetSlice.actions;
export const selectTarget = (state: RootState) => state.target;
export default targetSlice.reducer;
