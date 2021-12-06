import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  name: string,
  uid: string,
  icon: string | undefined
  namae: string,
  sei: string,
  age: number,
  sejyutsu: string,
  day: string,
  tokoro: string,
  erea: string,
  sns: string,
  qr: string,
  users: any
}

const initialState: UserState = {
  name: '',
  uid: '11111',
  icon: '',
  namae: '',
  sei: '',
  age: 0,
  sejyutsu: '',
  day: '',
  tokoro: '',
  erea: "",
  sns: "",
  qr: "",
  users: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name
      state.uid = action.payload.uid
      state.icon = action.payload.icon
      state.namae = action.payload.namae
      state.sei = action.payload.sei
      state.age = action.payload.age
      state.sejyutsu = action.payload.sejyutsu
      state.day = action.payload.day
      state.tokoro = action.payload.tokoro
      state.erea = action.payload.erea
      state.sns = action.payload.sns
      state.qr = action.payload.qr
      state.users = action.payload.users
    }
  },
});

export const { addUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
