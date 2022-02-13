import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { CustomerState } from "../../src/types/customer";

const initialState: CustomerState = {
    id: '',
    name: '',
    client_secret: null,
} as CustomerState;

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action) => {
            state.customer = action.payload
            state.name = action.payload.name
            state.id = action.payload.id
            state.client_secret = action.payload.client_secret
        }
    },
});

export const { addCustomer } = customerSlice.actions;
export const selectCustomer = (state: RootState) => state.customer;
export default customerSlice.reducer;
