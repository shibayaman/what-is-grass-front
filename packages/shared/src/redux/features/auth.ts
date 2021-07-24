import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth';

const initialState: {
  user: User | null;
  initialized: boolean;
} = {
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    loggedOut: (state) => {
      state.user = null;
    },
    initialized: (state) => {
      state.initialized = true;
    },
  },
});

export const { loggedIn, loggedOut, initialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
