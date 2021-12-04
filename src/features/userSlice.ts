import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  name: string,
  age: number,
  uid: string
}

const initialState: UserState = {
  name: 'user',
  age: -1,
  uid: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name
      state.age = action.payload.age
      state.uid = action.payload.uid
    }
  },
});

export const { addUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
