import { LoginUidStateType } from '@/types/LoginUidStateType';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


const initialState: LoginUidStateType = {
    uid: '',
    name: '',
    icon: '',
    value: false
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
