import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ProfileState {
  phoneNumber?: string;
  address?: string;
  company?: string;
  position?: string;
  bio?: string;
  avatarUrl?: string;
}

interface UserState {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  profile: ProfileState;
}

const initialState: UserState = {
  id: '',
  email: '',
  role: 'USER',
  profile: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { 
    setUser, 
    updateProfile 
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;