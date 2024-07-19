import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:6556/cart/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ userId, item }, thunkAPI) => {
    try {
      await axios.post("http://localhost:6556/cart", {
        user_id: userId,
        item_id: item.id,
      });
      return item;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ userId, itemId }, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:6556/cart/${userId}/${itemId}`);
      return itemId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        return state.filter((item) => item.id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
