import { fetchData } from "@/lib/api/apiHelper";
import { getPostDetails, getPosts } from "@/lib/api/endpoints";
import { Post } from "@/lib/types";
import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";


export const fetchPostDetails = createAsyncThunk(
    "post/fetchPostDetails",
    async ({ postId }: { postId: number }) => {
      const endpoint = getPostDetails(postId);
      const response = await fetchData(endpoint);

      return response.data;
    });


    interface PostDetailsState {
      post: Post | null;
      status: "idle" | "loading" | "succeeded" | "failed"
      votingStatus: "idle" | "loading" | "succeeded" | "failed"
      error: string | null
    }

const initialState: PostDetailsState = {
  post: null,
  status: "idle",
  votingStatus: "idle",
  error: null,
};


const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for fetching post details
      .addCase(fetchPostDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostDetails.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = "succeeded";
        console.log("post details", action.payload);

        state.post = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "failed to fetch post details";
      })
  }
})

export default postDetailsSlice.reducer;