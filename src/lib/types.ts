// User type representing a user object
export interface  User {
    id: number;
    firstName: string;
    lastName: string;
    profilePic: string;
}

// Content types for posts
export interface  TextContent {
    type: "text";
    content: string;
}

export interface  ImageContent {
    type: "image";
    url: string;
    caption: string;
}

// Post type representing a detailed post object
export interface Post {
    id: number;
    title: string;
    content: (TextContent | ImageContent)[];
    author: string;
    authorAvatar: string;
    datePublished: string; // ISO date-time format
    voteCount: number;
    userVote: "upvote" | "downvote" | "none";
}

// PostListItem type for a summarized post in a list
export interface  PostListItem {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    authorAvatar: string;
    datePublished: string; // ISO date-time format
    voteCount: number;
    userVote: "upvote" | "downvote" | "none";
}

// PostList type representing a paginated list of posts
export interface  PostList {
    posts: PostListItem[];
    totalPosts: number;
    page: number;
    perPage: number;
}

// Comment type representing a comment object
export interface  Comment {
    id: number;
    authorId: number;
    content: string;
    author: string;
    createdAt: string; // ISO date-time format
}

// CommentList type representing a paginated list of comments
export interface  CommentList {
    comments: Comment[];
    totalComments: number;
    page: number;
    perPage: number;
}

// CommentInput type for creating a new comment
export interface  CommentInput {
    content: string;
}

// VoteInput type for voting on a post
export interface  VoteInput {
    voteType: "upvote" | "downvote" | "none";
}

// Error type for error messages
export interface  Error {
    message: string;
}

// UnauthorizedError response type
export interface  UnauthorizedError {
    description: "API key is missing or invalid";
    content: {
        "application/json": Error;
    };
}

// NotFoundError response type
export interface  NotFoundError {
    description: "The specified resource was not found";
    content: {
        "application/json": Error;
    };
}

// BadRequestError response type
export interface  BadRequestError {
    description: "Invalid input";
    content: {
        "application/json": Error;
    };
}