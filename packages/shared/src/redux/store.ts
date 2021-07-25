import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';
import { questionReducer } from './features/question';
import { wordApi } from './services/word';

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    auth: authReducer,
    [wordApi.reducerPath]: wordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
