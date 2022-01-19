import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TargetState } from "../../src/types/target";

const initialState: TargetState = {
    target: '',
} as TargetState;

export const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
        addTarget: (state, action) => {
            state.target = action.payload
        }
    },
});

export const { addTarget } = targetSlice.actions;
export const selectTarget = (state: RootState) => state.target;
export default targetSlice.reducer;
