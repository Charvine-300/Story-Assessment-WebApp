import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./features/postsSlice"
import postDetailsReducer from "./features/postDetailsSlice"
import voteReducer from "./features/voteSlice"
import commentsReducer from "./features/commentsSlice"


const rootReducer = combineReducers({
  posts: postsReducer,
  postDetails: postDetailsReducer,
  vote: voteReducer,
  comments: commentsReducer
});

export default rootReducer;
