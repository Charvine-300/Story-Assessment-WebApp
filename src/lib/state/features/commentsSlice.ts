import { fetchData } from '@/lib/api/apiHelper';
import { commentsActions } from '@/lib/api/endpoints';
import { CommentList, Comment } from '@/lib/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async ({ postId }: { postId: number }) => {
    const endpoint = commentsActions(postId);
    const response = await fetchData(endpoint);

    if (response) return response.data;
  }
);

export const commentOnPost = createAsyncThunk(
  'comments/commentOnPost',
  async ({ postId }: { postId: number }) => {
    const endpoint = commentsActions(postId);
    const response = await fetchData(endpoint);

    if (response) return response.data;
  }
);

interface CommentsState {
  comments: Comment[];
  totalComments: number;
  page: number;
  perPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  commentOnPostStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status for uploading comments
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  totalComments: 0,
  page: 0,
  perPage: 0,
  status: 'idle',
  commentOnPostStatus: 'idle',
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for fetching comments
      .addCase(fetchPostComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPostComments.fulfilled,
        (state, action: PayloadAction<CommentList>) => {
          state.status = 'succeeded';
          // console.log("posts", action.payload);

          state.comments = action.payload.comments;
          state.perPage = action.payload.perPage;
          state.totalComments = action.payload.totalComments;
        }
      )
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'failed to fetch comments';
      });
  },
});

export default commentsSlice.reducer;
