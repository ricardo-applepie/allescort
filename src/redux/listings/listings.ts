import { getData } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Listing {
  src: string;
}


export interface SearchListingsState {
  listings: Listing[] ;
  loading: boolean;
  error: string |  undefined, 
  searchQuery: {
    city: string;
  }
  loaded: boolean;
}

const initialState: SearchListingsState = {
  listings: [], 
  searchQuery: {
    city: ''
  }, 
  loading: true, 
  error: "", 
  loaded: false
};

export const fetchListings = createAsyncThunk(
  "listings/fetch",
  async (_, { getState }) => {
    // Access the query (e.g., city) from the Redux state
    const state = getState() as { searchListings: SearchListingsState };
    const city = state.searchListings.searchQuery.city;  // Get city from Redux state

    if (!city) throw new Error("Query (city) is missing!");

    const response = await getData(`/api/v1/listings?city=${city}`);
    return response;
  }
);


export const searchSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListingsState: (state, action: PayloadAction<Listing[]>) => {
      state.listings = action.payload;
      state.loading = false
    },
    setSearchQueryCity: (state, action: PayloadAction<string>) => {
      state.searchQuery.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
        state.loaded = true
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loaded = true
      });
  },
});

export const { setListingsState, setSearchQueryCity } = searchSlice.actions;
export const searchListingReducer = searchSlice.reducer;