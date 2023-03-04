import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserState } from "../../src/types/user";

const initialState: UserState = {
  name: '',
  uid: '',
  icon: '',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state, ...action.payload
      };
    }
  },
});

export const { addUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
