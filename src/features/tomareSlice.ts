import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TomareState } from "../../src/types/tomare";

const initialState: TomareState = {
  // tomare: [],
  uid: '',
  menu: '',
  gappi: '',
  tomareId: '',
  am_pm: '',
  make: false,
  nail: false,
  este: false,
  sonota: '',
  yoyakuId: '',
  img_befor: '',
  img_after: '',
  come_befor: '',
  come_after: '',
  star: 0,
  chip: 0,
  checked: true
} as TomareState;

export const tomareSlice = createSlice({
  name: 'tomare',
  initialState,
  reducers: {
    addTomare: (state, action) => {
      state.tomare = action.payload
      state.uid = action.payload.uid
      state.menu = action.payload.menu
      state.gappi = action.payload.gappi
      state.tomareId = action.payload.tomareId
      state.am_pm = action.payload.am_pm
      state.make = action.payload.make
      state.nail = action.payload.nail
      state.este = action.payload.este
      state.sonota = action.payload.sonota
      state.yoyakuId = action.payload.yoyakuId
      state.img_befor = action.payload.img_befor
      state.img_after = action.payload.img_after
      state.come_befor = action.payload.come_befor
      state.come_after = action.payload.come_after
      state.star = action.payload.star
      state.chip = action.payload.chip
      state.checked = action.payload.checked
    }
  },
});

export const { addTomare } = tomareSlice.actions;
export const selectTomare = (state: RootState) => state.tomare;
export default tomareSlice.reducer;
