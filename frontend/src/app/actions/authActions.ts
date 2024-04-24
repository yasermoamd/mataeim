import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    User,
    NewUser,
    UserBasicInfo,
    UserProfileData
} from '../../types';
import axiosInstance from '../api/axiosInstance';


export const login = createAsyncThunk<UserBasicInfo, User>(
    'login',
    async (data: User) => {
      const response = await axiosInstance.post('/api/auth/login', data);
      const resData = response.data;
  
      const { access_token, ...userInfo } = resData;
  
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, access_token }));
      return { ...userInfo, access_token };
    }
  );

export const setBasicUserInfo = createAction<UserBasicInfo | null>('auth/setBasicUserInfo');


export const register = createAsyncThunk<UserBasicInfo, NewUser>(
    'register',
    async (data: NewUser) => {
      const response = await axiosInstance.post('/api/auth/register', data);
      const resData = response.data;
  
      localStorage.setItem('userInfo', JSON.stringify(resData));
      return resData;
    }
  );

  export const logout = createAsyncThunk<string, void>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        const userInfoString = localStorage.getItem('userInfo');
  
        if (!userInfoString) {
          throw new Error('User info not found in LocalStorage');
        }
  
        const userInfo = JSON.parse(userInfoString);
        const accessToken = userInfo.access_token;
  
        if (!accessToken) {
          throw new Error('Access Token not found');
        }
  
        await axiosInstance.post('/api/auth/logout', null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        localStorage.removeItem('userInfo');
        return 'Successfully logged out';
      } catch (error) {
        return rejectWithValue('Logout failed');
      }
    }
  );



export const getUser = createAsyncThunk<UserProfileData, void>(
    'users/profile',
    async () => {
      const userInfoString = localStorage.getItem('userInfo');
  
      if (!userInfoString) {
        throw new Error('User info not found in LocalStorage');
      }
  
      const userInfo = JSON.parse(userInfoString);
      const accessToken = userInfo.access_token;
  
      if (!accessToken) {
        throw new Error('Access Token not found');
      }
  
      const userId = userInfo.id;
      const response = await axiosInstance.get(`/api/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      return response.data;
    }
  );
  