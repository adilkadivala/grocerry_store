import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getItemData = createAsyncThunk("item/getItem", async () => {
  const response = await axios.get("http://localhost:6556/getitem");
  console.log(response.data);
  return response.data;
});

const itemSlice = createSlice({
  name: "item",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default itemSlice.reducer;
