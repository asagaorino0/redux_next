import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  name: string,
  age: number,
  uid: string,
  icon: string | undefined
}

const initialState: UserState = {
  name: 'user',
  age: -1,
  uid: '',
  icon: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name
      state.age = action.payload.age
      state.uid = action.payload.uid
      state.icon = action.payload.icon
    }
  },
});

export const { addUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
