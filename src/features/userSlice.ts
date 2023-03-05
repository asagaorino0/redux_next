import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserStateType } from '@/types/UserStateType';

const initialState: UserStateType = {
  name: '',
  uid: '',
  icon: '',
}

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
