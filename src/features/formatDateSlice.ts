import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { FormatDateStateType } from '@/types/FormatdateStateType';
import { Timestamp } from 'firebase/firestore';


const initialState: FormatDateStateType = {
    formatDate: '',
    nextDate: '',
    value: false,
    yoyakuMenu: '',
    menu: '',
    editMode: false,
    template: false,
    next: false,
    formatMonth: new Date(),
    bDate: new Date(),
    start: '',
    end: '',
    updatedAt: new Date()
}

export const formatDateSlice = createSlice({
    name: 'formatDate',
    initialState,
    reducers: {
        addFormatDate: (state, action) => {
            return {
                ...state, ...action.payload
            };
        },
    },
});

export const { addFormatDate } = formatDateSlice.actions;
export const selectFormatDate = (state: RootState) => state.formatDate;
export default formatDateSlice.reducer;
