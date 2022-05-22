import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    data: {},
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    clearUserData: (state) => {
      state.data = {};
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
