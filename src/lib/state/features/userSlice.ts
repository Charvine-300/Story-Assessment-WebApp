import { fetchData } from "@/lib/api/apiHelper";
import { getUserDetails } from "@/lib/api/endpoints";
import { User } from "@/lib/types";
import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

export const fetchUserDetails = createAsyncThunk(
    "user/fetchUserDetails",
    async () => {
        const response = await fetchData(getUserDetails);

        return response.data;
});

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Cases for fetching user details
    .addCase(fetchUserDetails.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
      state.status = "succeeded";
      // console.log("user deets", action.payload);

      state.user = action.payload;
    })
    .addCase(fetchUserDetails.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "failed to fetch posts";
    })
  }
})

export default userSlice.reducer;