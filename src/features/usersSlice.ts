import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UsersState } from "../../src/types/users";
import { MenuState } from "../../src/types/menu";

const initialState: UsersState = {
    name: '',
    uid: '',
    icon: '',
    // menu:{menu:[]},
    users: []
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
            state.menu = action.payload.menu
        }
    },
});

export const { addUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
