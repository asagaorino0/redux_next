import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { MenuState } from "../../src/types/menu";

const initialState: MenuState = {
    menu: [],
    make: false,
    nail: false,
    este: false,
    sonota: "",

} as MenuState;

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addMenu: (state, action) => {
            state.menu = action.payload
            state.make = action.payload.make
            state.nail = action.payload.nail
            state.este = action.payload.este
            state.sonota = action.payload.sonota
        }
    },
});

export const { addMenu } = menuSlice.actions;
export const selectMenu = (state: RootState) => state.menu;
export default menuSlice.reducer;
