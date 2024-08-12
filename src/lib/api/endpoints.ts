const base_url = process.env.NEXT_PUBLIC_BASE_URL;

// POSTS
export const getPosts = (per_page: number, page: number) => base_url + `/posts?per_page=${per_page}&page=${page}`;
export const getPostDetails = (postId: number) => base_url + `/posts/${postId}`;

//  VOTING
export const vote = (postId: number) => base_url + `/posts/${postId}/vote`;

// COMMENTS
export const commentsActions = (postId: number) => base_url + `/posts/${postId}/comments`;
export const deleteComment = (postId: number, commentId: number) => base_url + `/posts/${postId}/comments/${commentId}`;