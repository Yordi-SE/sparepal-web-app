import { createSlice } from "@reduxjs/toolkit";

const companyIdSlice = createSlice({
  name: "companyId",
  initialState: "",
  reducers: {
    setCompanyId: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCompanyId } = companyIdSlice.actions;
export default companyIdSlice.reducer;
