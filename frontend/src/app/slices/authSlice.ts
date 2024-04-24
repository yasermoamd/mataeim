import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { getUser, login, logout, register, setBasicUserInfo } from "../actions/authActions";
import {
  AuthApiState,
    UserBasicInfo
} from '../../types';

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
  userProfileData: undefined,
  status: 'idle',
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
    })
    .addCase(login.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
            state.status = "idle";
            state.basicUserInfo = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
    })
    .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
          state.status = "idle";
          state.basicUserInfo = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registration failed";
      })
      
    .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.basicUserInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout failed";
      })

      // ... other extra reducers
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.userProfileData = null; // Reset profile data on fetch
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userProfileData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
        state.userProfileData = null; // Reset profile data on error
      });
  },
});

export default authSlice.reducer;