import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import usersReducer from '../features/usersSlice';
import tomareReducer from '../features/tomareSlice';
import targetTomareReducer from '../features/targetTomareSlice';
import formatdateReducer from '../features/formatDateSlice';
import menuReducer from '../features/menuSlice';
import targetReducer from '../features/targetSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    tomare: tomareReducer,
    targetTomare: targetTomareReducer,
    formatdate: formatdateReducer,
    menu: menuReducer,
    target: targetReducer
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
