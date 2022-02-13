import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UsersState } from "../../src/types/users";

const initialState: UsersState = {
    // menu:{menu:[]},
    // users: [],
    name: '',
    uid: 'k11111',
    icon: '',
    tokoro: '',
    erea: '',
    namae: '',
    qr: '',
    sei: '',
    sns: '',
} as UsersState;

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.users = action.payload
            state.name = action.payload.name
            state.uid = action.payload.uid
            state.icon = action.payload.icon
            state.tokoro = action.payload.tokoro
            state.erea = action.payload.erea
            // state.users = action.payload.users
            state.namae = action.payload.namae
            state.qr = action.payload.qr
            state.sei = action.payload.sei
            state.sns = action.payload.sns
        }
    },
});

export const { addUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
