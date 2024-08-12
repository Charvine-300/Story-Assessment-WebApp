"use client"

import Link from "next/link";
import {ArrowDownIcon, ArrowUpIcon, BookIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import CommentCard from "@/components/comment-card";
import PostContentBlock from "@/components/post-content-block";
import {capitaliseFirstLetter, getDaysAgo} from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/state/store";
import { fetchPostDetails } from "@/lib/state/features/postDetailsSlice";
import Loading from "@/components/ui/loading";
import ErrorPage from "@/components/ui/error";
import { fetchPostComments } from "@/lib/state/features/commentsSlice";
import bookFlipping from "@/lotties/book-loading.json"
import commentBubbles from "@/lotties/comment-loading.json"
import { fetchData } from "@/lib/api/apiHelper";
import { commentsActions } from "@/lib/api/endpoints";
import CommentForm from "@/components/comment-form";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";
import { voteOnPost } from "@/lib/state/features/voteSlice";



const PostPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, post } = useSelector((state: RootState) => state.postDetails);
  const { comments, status: commentStatus, error: commentError } = useSelector((state: RootState) => state.comments);

  const [isLoading, setIsLoading] = useState(false);
  const [isVoteLoading, setIsVoteLoading] = useState(false); 
  const [voteCount, setVoteCount] = useState(0);

      // Convert param to number
      const id = Number(params.id);


  const handleComment = async (comment: string, resetForm: () => void) => {
    setIsLoading(true);

    try {
      const endpoint = commentsActions(id);
      await fetchData(endpoint, "POST", {
        "content": `${comment}`
      });
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    } finally {
      setIsLoading(false);
      resetForm(); // Reset the form after submission

      // Fetching comments after comment action
      dispatch(fetchPostComments({ postId: id }))
    }
  };

  const handleVote = async (voteType: string) => {
    setIsVoteLoading(true);
    try {
      await dispatch(voteOnPost({ postId: id, voteType })).unwrap();

      // Update vote count based on voteType
      setVoteCount(prevCount => (prevCount ?? 0) + (voteType === "upvote" ? 1 : -1));
    } catch (error) {
      setIsVoteLoading(false);
      console.error('Vote failed:', error);
    } finally {
      setIsVoteLoading(false);
    }
  };

  // TODO - Add delete handler
  // const handleDeleteComment = async (id: string) => {

  // };
  
  useEffect(() => {
    // Fetch post details
    dispatch(fetchPostDetails({ postId: id })).then(() => {
      // TODO - Fix vote count discrepancies
      setVoteCount(post?.voteCount as number);
      // Fetching comments after post details
      dispatch(fetchPostComments({ postId: id }))
    });
  }, []);


    return (
            <main className="bg-background rounded-lg border p-6 grid gap-4">
              {/* Back button */}
              <Link href={"/"}>
              <div className="flex gap-1 items-center justify-normal my-4">
                <Image
                  src={"/assets/arrow-back.svg"}
                  width={30}
                  height={30}
                  alt="Back arrow icon"
                 />
                 <p className="text-black"> Back to Posts </p>
              </div>
              </Link>

              {/* Loading screen */}
               {status === "loading" && (
      <Loading message="Loading post details..." animationData={bookFlipping} />
    )}

    {/* Error screen */}
    {status === "failed" && (
      <ErrorPage message={error as string} />
    )}

    {/* Success screen */}
    {status === "succeeded" && post && (
      <>
                <div className="flex items-center gap-4">
                    <Avatar className="size-10">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>{post.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <div className="text-sm text-muted-foreground">
                            {post.author} • {capitaliseFirstLetter(getDaysAgo(post.datePublished))}
                        </div>
                    </div>
                </div>
                <article className="grid gap-4">
                    {post.content.map((item, index) => (
                        <PostContentBlock key={index} item={item} />
                    ))}
                </article>
                <div className="space-y-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Button variant="ghost" size="icon" className={`hover:text-green-600 ${post.userVote == 'upvote' && 'text-green-500'}`} onClick={() => handleVote("upvote")}>
                            <ArrowUpIcon className="w-5 h-5" />
                        </Button>
                        <span>{voteCount}</span>
                        <Button variant="ghost" size="icon" className={`hover:text-red-600 ${post.userVote == 'downvote' && 'text-red-500'}`} onClick={() => handleVote("downvote")}>
                            <ArrowDownIcon className="w-5 h-5" />
                        </Button>

                        {/* local loading check. For API call to vote */}
                        {isVoteLoading && <Spinner size={5} />}
                    </div>
                </div>
              
              {/* Comment Form */}
              <CommentForm isLoading={isLoading} onSubmit={handleComment} />


                      {/* Comments Loading screen */}
               {commentStatus === "loading" && (
      <Loading message="Loading comments..." animationData={commentBubbles} size={100} />
    )}

    {/* Error screen */}
    {commentStatus === "failed" && (
      <ErrorPage message={commentError as string} />
    )}

 {/* Success screen */}
 {commentStatus === "succeeded" && (
                <div className="grid gap-4">
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>

 )}    
      </>
    )}
            </main>
    );
};

export default PostPage;