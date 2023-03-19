import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';
import { toast } from 'react-toastify';


export interface LoginPayload {
  username: string;
  password: string;
}
export interface SignupPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// khi bao kieu state
export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}

// khoi tao state
const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // khi ditch action phai chuyen len payload {username, password} nen dinh nghia ra payload va chuyen vao (thuong chi dung trong saga ma ko dung o day vi goi API o trong saga)
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    // khi dang nhap thanh cong mong muon dc nhan ve 1 user nen dunfg kieu du lieu tra la la USER
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
      toast.success('Login successfully!');

    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      toast.error('Login failed!');
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
    signup(state, action: PayloadAction<SignupPayload>) {
      state.logging = true;
    },
    signupSuccess(state, action: PayloadAction<string>) {
      // state.isLoggedIn = true;
      // state.logging = false;
      // state.currentUser = action.payload;
      toast.success('Signup successfully!');

    },
    signupFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      toast.error('Signup failed!');
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
