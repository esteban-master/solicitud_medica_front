import { createSlice, createAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth';
import { HealthProfessional } from '../../models/healthProfessional';

export type Info = {
  entityId: number;
  createdAt: Date;
  updatedAt: Date;
  professionId?: number; 
}

export type UserEntity = Partial<HealthProfessional> & User & { info: Info };

export type AuthState = {
  user: UserEntity | null;
  isLoading: boolean;
  error: any;
  logged: boolean,
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  logged: false,
  error: ''
}

export const toggleLoading = createAction('toggleLoading')
export const loginAction = createAction<UserEntity>('login')
export const logoutAction = createAction('logout')

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction, (state, action) => {
        state.user = action.payload
        state.logged = true
        state.isLoading = false
      })
      .addCase(logoutAction, (state) => {
        state.logged = false
        state.user = null
        state.isLoading = false
      })
      .addCase(toggleLoading, (state) => {
        state.isLoading = !state.isLoading
      })
  }
})

export default authSlice.reducer