import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ColorStateType } from '../types/ColorStateType';

const initialState: ColorStateType = {
    shopUid: '',
    base: '',
    moji: '',
    sub: '',
    chapter: ''
}

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        addColor: (state, action) => {
            return {
                ...state, ...action.payload
            };
        },
    },
});

export const { addColor } = colorSlice.actions;
export const selectColor = (state: RootState) => state.color;
export default colorSlice.reducer;
