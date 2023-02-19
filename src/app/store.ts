import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import usersReducer from '../features/usersSlice';
import tomareReducer from '../features/tomareSlice';
import targetTomareReducer from '../features/targetTomareSlice';
import formatdateReducer from '../features/formatDateSlice';
import menuReducer from '../features/menuSlice';
import targetReducer from '../features/targetSlice';
import targetUidReducer from '../features/targetUidSlice';
import targetYoyakuReducer from '../features/targetYoyakuSlice';
import targetChatReducer from '../features/targetChatSlice';
import customerReducer from '../features/customerSlice';
import colorReducer from '../features/colorSlice'

export const store: any = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    tomare: tomareReducer,
    targetTomare: targetTomareReducer,
    formatdate: formatdateReducer,
    menu: menuReducer,
    target: targetReducer,
    targetUid: targetUidReducer,
    targetYoyaku: targetYoyakuReducer,
    targetChat: targetChatReducer,
    customer: customerReducer,
    color: colorReducer,
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
