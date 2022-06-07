import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: '',
};
const MouviesSlices = createSlice({
  name: 'Cloneflix Movies',
  initialState,
  reducers: {
    test(state,actions) {
      console.log(actions.payload);
    },
  },
});
export const MouviesActions = MouviesSlices.actions;
export default MouviesSlices.reducer;
