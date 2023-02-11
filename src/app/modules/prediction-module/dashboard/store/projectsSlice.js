import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSkus = createAsyncThunk(
  'supermarket/getSkus',
  async () => {
    const response = await axios.get('http://localhost:8080/supermarket/mock-sku');
    return response.data;
  }
);

export const selectSku = createAsyncThunk(
  'supermarket/selectSku',
  async () => {
    console.log('supermarket/selectSku');
    const response = await axios.get('http://localhost:8080/supermarket/mock-getSkuPredictions/1');
    return response.data;
  }
);

const skusAdapter = createEntityAdapter({});

const projectsSlice = createSlice({
  name: 'supermarket/skus',
  initialState: skusAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getSkus.fulfilled]: (state, action) => action.payload,
  },
});

export default projectsSlice.reducer;
