import { combineReducers, configureStore, AnyAction } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux'
import authReducer from './auth/authSlice'

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'reduxjs-toolkit-persist'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1'
import storage from 'reduxjs-toolkit-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1
}

const reducers = combineReducers({
  auth: authReducer
})

type State = ReturnType<typeof reducers>
 
const _persistedReducer = persistReducer<
  ReturnType<typeof reducers>,
  AnyAction
>(persistConfig, reducers)


export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV === 'development'
})

export const persistor = persistStore(store)

export const useAuth = () => useSelector((state: State) => state.auth)