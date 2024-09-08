import { configureStore } from '@reduxjs/toolkit';

import authSlice from '../../modules/auth/authSlice';
import singleTaskSlice from '../../modules/tasks/slices/singleTaskSlice';
import groupTasksSlice from '../../modules/tasks/slices/groupTasksSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    singleTask: singleTaskSlice.reducer,
    groupTasksState: groupTasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
