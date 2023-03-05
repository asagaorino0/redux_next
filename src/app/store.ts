import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import colorReducer from '../features/colorSlice'
import todoReducer from '../features/todoSlice'
import tomareReducer from '../features/tomareSlice';
import targetTomareReducer from '../features/targetTomareSlice';
import formatdateReducer from '../features/formatDateSlice';
import menuReducer from '../features/menuSlice';
import targetReducer from '../features/targetSlice';
import targetUidReducer from '../features/targetUidSlice';
import targetYoyakuReducer from '../features/targetYoyakuSlice';
import targetChatReducer from '../features/targetChatSlice';
import customerReducer from '../features/customerSlice';

export const store: any = configureStore({
  reducer: {
    user: userReducer,
    color: colorReducer,
    todo: todoReducer,
    tomare: tomareReducer,
    targetTomare: targetTomareReducer,
    formatdate: formatdateReducer,
    menu: menuReducer,
    target: targetReducer,
    targetUid: targetUidReducer,
    targetYoyaku: targetYoyakuReducer,
    targetChat: targetChatReducer,
    customer: customerReducer,
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
