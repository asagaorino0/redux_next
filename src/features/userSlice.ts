import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserState } from "../../src/types/user";

const initialState: UserState = {
  // user: [],
  name: '',
  uid: '',
  icon: '',
  namae: '',
  sei: "",
  tokoro: '',
  area: "",
  sns: "",
  qr: "",
  userliff: [],
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload
      //   return action.payload
      // }
      // addUser: (state, action) => {

      state.name = action.payload.name
      state.uid = action.payload.uid
      state.icon = action.payload.icon
      state.namae = action.payload.namae
      state.sei = action.payload.sei
      state.tokoro = action.payload.tokoro
      state.area = action.payload.area
      state.sns = action.payload.sns
      state.qr = action.payload.qr
      state.userliff = action.payload.userliff
    }
  },
});

export const { addUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
