import { fetchData } from "@/lib/api/apiHelper";
import { getPosts } from "@/lib/api/endpoints";
import { PostList, PostListItem } from "@/lib/types";
import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

interface QueryParamsProps {
  per_page: number;
  page: number;
}

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ({ per_page, page }: QueryParamsProps) => {   
        const endpoint = getPosts(per_page, page);
            const response = await fetchData(endpoint);
            
            return response.data;
});


interface PostsState {
  posts: PostListItem[];
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  page: number
  totalPosts: number
  perPage: number
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
  page: 1,
  totalPosts: 0,
  perPage: 10
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    perPageCalc: (state, action) => {
      state.perPage = action.payload;
    },
    pageCalc: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    // Cases for fetching posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostList>) => {
        state.status = "succeeded";
        // console.log("posts", action.payload);

        state.posts = action.payload.posts;
        state.perPage = action.payload.perPage;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "failed to fetch posts";
      })
  },
});

export const {
  perPageCalc,
  pageCalc
} = postsSlice.actions
export default postsSlice.reducer;