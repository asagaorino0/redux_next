import { CurrentNavigationStateType } from '@/types/CurrentNavigationStateType';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState: CurrentNavigationStateType = {
    name: '',
    href: '',
    current: false
};

export const currentNavigationSlice = createSlice({
    name: 'currentNavigation',
    initialState,
    reducers: {
        addCurrentNavigation: (state, action) => {
            return {
                ...state, ...action.payload
            };
        },
    },
});

export const { addCurrentNavigation } = currentNavigationSlice.actions;
export const selectCurrentNavigation = (state: RootState) => state.currentNavigation;
export default currentNavigationSlice.reducer;