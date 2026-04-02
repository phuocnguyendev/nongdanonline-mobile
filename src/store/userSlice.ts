import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
