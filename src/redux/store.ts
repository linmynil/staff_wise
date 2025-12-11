import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '@services/baseAPI';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import accountReducer from './reducers/account.slice';
import authReducer from './reducers/auth.slice';
// import { createTransform } from 'redux-persist';

// const resetChatbotTransform = createTransform(
//   inboundState => inboundState,
//   (outboundState: any) => ({
//     ...outboundState,
//     isVisibleChatbot: true,
//   }),
//   { whitelist: ['account'] },
// );

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [baseAPI.reducerPath],
  whitelist: ['auth', 'account'],
  // transforms: [resetChatbotTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseAPI.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
