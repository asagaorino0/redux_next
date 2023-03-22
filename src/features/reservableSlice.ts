import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ReservableStateType } from '../types/ReservableStateType';

const initialState: ReservableStateType = {
    shopUid: '',
    price: 0,
    transportation_cost: 0
};

export const reservableSlice = createSlice({
    name: 'reservable',
    initialState,
    reducers: {
        addReservable: (state, action) => {
            return {
                ...state, ...action.payload
            };
        }
    },
});

export const { addReservable } = reservableSlice.actions;
export const selectReservable = (state: RootState) => state.reservable;
export default reservableSlice.reducer;
