import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserState } from "../../src/types/user";

const initialState: UserState = {
  // user: [],
  name: '',
  uid: '',
  icon: '',
  namae: '',
  sei: '',
  tokoro: '',
  area: '',
  chip: 0,
  stage: '',
  sns: '',
  o_sns: 300,
  qr: '',
  o_qr: 1000,
  copy: '',
  o_copy: 300,
  img: '',
  o_img: 300,
  rogo: '',
  o_rogo: 300,
  timesail: 0,
  o_timesail: 300,
  tanka: 0,
  o_tanka: 300,
  befor_img: '',
  after_img: '',
  befor_come: '',
  after_come: '',
  o_befor_come: 200,
  o_after_come: 200,
  pv: '',
  o_pv: 500,
  make: false,
  nail: false,
  este: false,
  sonota: '',
  url: '',
  o_url: 300,
  sikaku: '',
  o_sikaku: 300
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
      state.copy = action.payload.copy
      state.make = action.payload.make
      state.nail = action.payload.nail
      state.este = action.payload.este
      state.sonota = action.payload.sonota
    }
  },
});

export const { addUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
