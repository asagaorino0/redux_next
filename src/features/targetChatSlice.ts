import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TargetState } from "../../src/types/target";

const initialState: TargetState = {
    targetChat: '',
    yoyakuId: '',
    tomareId: ''
} as TargetState;

export const targetChatSlice = createSlice({
    name: 'targetChat',
    initialState,
    reducers: {
        addTargetChat: (state, action) => {
            state.targetChat = action.payload
            state.yoyakuId = action.payload.yoyakuId
            state.tomareId = action.payload.tomareId
        }
    },
});

export const { addTargetChat } = targetChatSlice.actions;
export const selectTargetChat = (state: RootState) => state.target;
export default targetChatSlice.reducer;
