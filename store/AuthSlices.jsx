import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  authState: {email: null, password: null},
  isLogined: false,
};
const AuthSlices = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    signUp(state, actions) {
      state.authState = {
        email: actions.payload.email,
        password: actions.payload.password,
      };
    },
    logIn(state, actions) {
      if (
        state.authState.email === actions.payload.email ||
        state.authState.password === actions.payload.password
      ) {
        state.isLogined = true;
      }
      return;
    },
  },
});
export const AuthActions = AuthSlices.actions;
export default AuthSlices.reducer;
