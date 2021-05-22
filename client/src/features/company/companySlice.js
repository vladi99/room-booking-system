import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCompany, deleteCompany, fetchCompanies, fetchCompany, updateCompany } from './companyAPI';
import { FAIL, IDLE, LOADING, SUCCESS } from '../../constants';

const initialState = {
  items: [],
  selected: { },
  status: IDLE,
};

export const fetchCompaniesAsync = createAsyncThunk('company/fetchCompanies', async () => {
  const res = await fetchCompanies();
  return res.data;
});

export const fetchCompanyAsync = createAsyncThunk('company/fetchCompany', async (id) => {
  const res = await fetchCompany(id);
  return res.data;
});

export const deleteCompanyAsync = createAsyncThunk('company/deleteCompany', async (id) => {
  const res = await deleteCompany(id);
  return res.data;
});

export const createCompanyAsync = createAsyncThunk('company/createCompany', async (company, { rejectWithValue }) => {
  try {
    const res = await createCompany(company);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const updateCompanyAsync = createAsyncThunk('company/updateCompany', async (company, { rejectWithValue }) => {
  try {
    const res = await updateCompany(company);
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    selectItem(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompaniesAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchCompaniesAsync.fulfilled, (state, action) => {
        state.status = SUCCESS
        state.items.push(...action.payload);
      })
      .addCase(fetchCompaniesAsync.rejected, (state, action) => {
        state.status = FAIL;
      })
      .addCase(fetchCompanyAsync.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateCompanyAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === state.selected.id);
        state.items[index] = action.payload;
        state.selected = action.payload;
      })
      .addCase(createCompanyAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCompanyAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => state.selected?.id !== item.id);
        state.selected = {};
      })
  },
});

export const selectCompanies = (state) => state.company.items;
export const selectCompanyStatus = (state) => state.company.status;
export const selectSelectedCompany = (state) => state.company.selected;

export const { selectItem } = companySlice.actions

export default companySlice.reducer;
