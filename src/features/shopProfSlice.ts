import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ShopProfStateType } from '../types/ShopProfStateType';


const initialState: ShopProfStateType = {
    shopUid: '',
    yago: '',
    insta: '',
    o_insta: 300,
    fb: '',
    o_fb: 300,
    youtube: '',
    o_youtube: 500,
    qr: '',
    o_qr: 1000,
    img: '',
    pv: '',
    t_pv: '',
    o_pv: 500,
    url: '',
    t_url: '',
    o_url: 300,
    sikaku: '',
    o_sikaku: 300,
    manabi: '',
    manabi_url: '',
    star: 0,
};

export const shopProfSlice = createSlice({
    name: 'shopProf',
    initialState,
    reducers: {
        addShopProf: (state, action) => {
            return {
                ...state, ...action.payload
            };
        },
    },
});

export const { addShopProf } = shopProfSlice.actions;
export const selectShopProf = (state: RootState) => state.shopProf;
export default shopProfSlice.reducer;
