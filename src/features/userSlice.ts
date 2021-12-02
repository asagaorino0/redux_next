import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  name: string,
  age: number,
}

const initialState: UserState = {
  name: 'user',
  age: -1,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name
      state.age = action.payload.age

    }
  },
});

export const { addUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
