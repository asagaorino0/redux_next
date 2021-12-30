import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserState } from "../../src/types/user";

// interface UserState {
//   name: string,
//   uid: string,
//   icon: string | undefined
//   namae: string,
//   sei: string,
//   age: number,
//   menu: string,
//   day: string,
//   tokoro: string,
//   area: string,
//   sns: string,
//   qr: string,
//   users: any
// }

const initialState: UserState = {
  name: 'namae',
  uid: 'k11111',
  icon: '',
  namae: '',
  sei: '',
  age: 0,
  menu: '',
  day: '',
  tokoro: '',
  area: "",
  sns: "",
  qr: "",
  users: [],
  userliff: []
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      // state.user = action.payload
      return action.payload
    }
    //addUser: (state, action) => {
    //   state.name = action.payload.name
    //   state.uid = action.payload.uid
    //   state.icon = action.payload.icon
    //   state.namae = action.payload.namae
    //   state.sei = action.payload.sei
    //   state.age = action.payload.age
    //   state.menu = action.payload.menu
    //   state.day = action.payload.day
    //   state.tokoro = action.payload.tokoro
    //   state.area = action.payload.area
    //   state.sns = action.payload.sns
    //   state.qr = action.payload.qr
    //   state.users = action.payload.users
    // }
  },
});

export const { addUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
