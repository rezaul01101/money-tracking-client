import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './rootReducer';
import { baseApi } from './api/baseApi';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// Get the state and dispatch types from store
export const getState = store.getState;
export const dispatch = store.dispatch;