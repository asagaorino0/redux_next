import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { FormatdateState } from "../../src/types/formatDate";

const initialState: FormatdateState = {
    formatdate: '',
} as FormatdateState;

export const formatdateSlice = createSlice({
    name: 'formatdate',
    initialState,
    reducers: {
        addFormatdate: (state, action) => {
            state.formatdate = action.payload.formatdate
        }
    },
});

export const { addFormatdate } = formatdateSlice.actions;
export const selectFormatdate = (state: RootState) => state.formatdate;
export default formatdateSlice.reducer;
