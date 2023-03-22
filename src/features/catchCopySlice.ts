import { CatchCopyStateType } from '@/types/CatchCopyStateType';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState: CatchCopyStateType = {
    shopUid: '',
    catchCopy: '',
    pattern: '',
    editMode: false,
    catchCopyColorBase: 0,
    catchCopyColorMoji: 0,
    catchCopyColorSub: 0,
} as CatchCopyStateType

export const catchCopySlice = createSlice({
    name: 'catchCopy',
    initialState,
    reducers: {
        addCatchCopy: (state, action) => {
            return {
                ...state, ...action.payload
            };
        },
    },
});

export const { addCatchCopy } = catchCopySlice.actions;
export const selectCatchCopy = (state: RootState) => state.catchCopy;
export default catchCopySlice.reducer;