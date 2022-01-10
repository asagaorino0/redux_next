import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import usersReducer from '../features/usersSlice';
import tomareReducer from '../features/tomareSlice';
import formatdateReducer from '../features/formatDateSlice';
import menuReducer from '../features/menuSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    tomare: tomareReducer,
    formatdate: formatdateReducer,
    menu: menuReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
