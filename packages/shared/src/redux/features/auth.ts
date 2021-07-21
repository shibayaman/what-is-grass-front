import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth';

const initialState: {
  user: User | null;
} = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { loggedIn } = authSlice.actions;
export const authReducer = authSlice.reducer;
