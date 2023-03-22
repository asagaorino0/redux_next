import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ReservableDateStateType } from '../types/ReservableDateStateType';

const initialState: ReservableDateStateType = {
    shopUid: '',
    startTime: '',
    endTime: '',
    reservableDateId: '',
    reservableDate: ''
};

export const reservableDateSlice = createSlice({
    name: 'reservableDate',
    initialState,
    reducers: {
        addReservableDate: (state, action) => {
            return {
                ...state, ...action.payload
            };
        }
    },
});

export const { addReservableDate } = reservableDateSlice.actions;
export const selectReservableDate = (state: RootState) => state.reservableDate;
export default reservableDateSlice.reducer;
