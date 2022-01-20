import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TargetUidState } from "../../src/types/targetUid";

const initialState: TargetUidState = {
    uid: '',
    menu: "",
    gappi: "",
} as TargetUidState;

export const targetUidSlice = createSlice({
    name: 'targetUid',
    initialState,
    reducers: {
        addTargetUid: (state, action) => {
            state.uid = action.payload
            state.menu = action.payload.menu
            state.gappi = action.payload.gappi
        }
    },
});

export const { addTargetUid } = targetUidSlice.actions;
export const selectTargetUid = (state: RootState) => state.targetUid;
export default targetUidSlice.reducer;
