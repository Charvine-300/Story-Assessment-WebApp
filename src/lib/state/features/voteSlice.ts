import { fetchData } from "@/lib/api/apiHelper";
import { vote } from "@/lib/api/endpoints";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

interface VoteProps {
    postId: number;
    voteType: string;
  };

  export const voteOnPost = createAsyncThunk(
    "votes/voteOnPost",
    async ({ postId, voteType }: VoteProps) => {
      const endpoint = vote(postId);
      const response = await fetchData(endpoint, "POST", {
        "voteType": `${voteType}`
      });
  
      return response.data
  });


interface VoteState {
    votingStatus: "idle" | "loading" | "succeeded" | "failed"
};

const initialState: VoteState = {
  votingStatus: "idle"
};

const voteSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       // Cases for voting on posts
       .addCase(voteOnPost.pending, (state) => {
        state.votingStatus = "loading";
      })
      .addCase(voteOnPost.fulfilled, (state) => {
        state.votingStatus = "succeeded";
  
        // TODO - Add Toast success
      })
      .addCase(voteOnPost.rejected, (state, action) => {
        state.votingStatus = "failed";
  
        // TODO - Add Toast error
      })
  }
});

export default voteSlice.reducer;