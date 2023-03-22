import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import userReducer from '../features/userSlice'
import colorReducer from '../features/colorSlice'
import todoReducer from '../features/todoSlice'
import tomareReducer from '../features/tomareSlice';
import targetTomareReducer from '../features/targetTomareSlice';
import formatDateReducer from '../features/formatDateSlice';
import menuReducer from '../features/menuSlice';
import targetReducer from '../features/targetSlice';
import targetUidReducer from '../features/targetUidSlice';
import targetYoyakuReducer from '../features/targetYoyakuSlice';
import targetChatReducer from '../features/targetChatSlice';
import customerReducer from '../features/customerSlice';
import currentNavigationReducer from '../features/currentNavigationSlice';
import reservableReducer from '../features/reservableSlice';
import reservableDateReducer from '../features/reservableDateSlice';
import shopProfReducer from '../features/shopProfSlice'
import catchCopyReducer from '../features/catchCopySlice';

const reducers = combineReducers({
  color: colorReducer,
  catchCopy: catchCopyReducer,
  user: userReducer,
  shopProf: shopProfReducer,
  currentNavigation: currentNavigationReducer,
  formatDate: formatDateReducer,
  reservableDate: reservableDateReducer,

  reservable: reservableReducer,
  todo: todoReducer,
  tomare: tomareReducer,
  targetTomare: targetTomareReducer,
  menu: menuReducer,
  target: targetReducer,
  targetUid: targetUidReducer,
  targetYoyaku: targetYoyakuReducer,
  targetChat: targetChatReducer,
  customer: customerReducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

