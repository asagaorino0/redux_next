import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { LoginUidStateType } from '../types/LoginUidStateType';

const initialState: LoginUidStateType = {
    uid: '',
    name: '',
    icon: '',
};

export const loginUidSlice = createSlice({
    name: 'loginUid',
    initialState,
    reducers: {
        addLoginUid: (state, action) => {
            return {
                ...state, ...action.payload
            };
        }
    },
});

export const { addLoginUid } = loginUidSlice.actions;
export const selectLoginUid = (state: RootState) => state.loginUid;
export default loginUidSlice.reducer;