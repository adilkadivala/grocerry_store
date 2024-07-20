import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:6556/getcartitem/${userId}`
      );
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
      const response = await axios.post(
        "http://localhost:6556/insertcartcart",
        {
          user_id: userId,
          item_id: item.id,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ id }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:6556/deletecartitem/${id}`
      );
      console.log("Response from server:", response);
      return;
    } catch (error) {
      console.error("Error in removeCartItem thunk:", error);
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
