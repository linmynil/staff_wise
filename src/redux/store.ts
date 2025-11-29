import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '@services/baseAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './reducers/auth.slice';
import { createTransform } from 'redux-persist';

const appTransform = createTransform(
  inboundState => inboundState,
  (outboundState: any) => ({
    ...outboundState,
    isVisibleChatbot: true,
  }),
  { whitelist: ['app'] },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [baseAPI.reducerPath],
  transforms: [appTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer as any),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseAPI.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
