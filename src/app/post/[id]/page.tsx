"use client"

import Link from "next/link";
import {ArrowDownIcon, ArrowUpIcon, BookIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import CommentCard from "@/components/comment-card";
import PostContentBlock from "@/components/post-content-block";
import {capitaliseFirstLetter, getDaysAgo, isErrorResponse} from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/state/store";
import { fetchPostDetails, userVotes } from "@/lib/state/features/postDetailsSlice";
import Loading from "@/components/ui/loading";
import ErrorPage from "@/components/ui/error";
import { fetchPostComments } from "@/lib/state/features/commentsSlice";
import bookFlipping from "@/lotties/book-loading.json"
import commentBubbles from "@/lotties/comment-loading.json"
import { fetchData } from "@/lib/api/apiHelper";
import { commentsActions, deleteComment } from "@/lib/api/endpoints";
import CommentForm from "@/components/comment-form";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";
import { voteOnPost } from "@/lib/state/features/voteSlice";
import Modal from "@/components/modal";
import toast from "react-hot-toast";
import "@/styles/animation.css";



const PostPage = ({ params }: { params: { id: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error, post, voteCount } = useSelector((state: RootState) => state.postDetails);
  const { comments, status: commentStatus, error: commentError } = useSelector((state: RootState) => state.comments);

  const [isLoading, setIsLoading] = useState(false);
  const [isVoteLoading, setIsVoteLoading] = useState(false); 
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [commentID, setCommentID] = useState(0);

  const openDeleteModal = (comment: number) => {
    setCommentID(comment);
    setIsModalOpen(true);
  }

      // Convert param to number
      const id = Number(params.id);


  const handleComment = async (comment: string, resetForm: () => void) => {
    setIsLoading(true);

    try {
      const endpoint = commentsActions(id);
      await fetchData(endpoint, "POST", {
        "content": `${comment}`
      });
    } catch (error: unknown) {
      setIsLoading(false);

      if (isErrorResponse(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
  
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
      const newVoteCount = voteCount + (voteType === "upvote" ? 1 : -2);
      dispatch(userVotes(newVoteCount));
    } catch (error: unknown) {
      setIsVoteLoading(false);

      if (isErrorResponse(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsVoteLoading(false);
    }
  };

  // TODO - Add delete handler
  const handleDeleteComment = async () => {
    setIsDeleteLoading(true);

    try {
      const endpoint = deleteComment(id, commentID);
      await fetchData(endpoint, "DELETE");
    } catch (error: unknown) {
      setIsDeleteLoading(false);
      setIsModalOpen(false);

      if (isErrorResponse(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsDeleteLoading(false);
      setIsModalOpen(false);

      // Fetching comments after comment deletion
      dispatch(fetchPostComments({ postId: id }))
    }
  };
  
  useEffect(() => {
      // Fetch post details
      dispatch(fetchPostDetails({ postId: id })).then(() => {
    
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
      <div className="fade-in-up">
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
                    <div className="flex items-center gap-1 text-muted-foreground my-3">
                        <Button variant="ghost" size="icon" className={`hover:text-green-600 ${post.userVote == "upvote" && "text-green-500"}`} onClick={() => handleVote("upvote")}>
                            <ArrowUpIcon className="w-5 h-5" />
                        </Button>
                        <span>{voteCount}</span>
                        <Button variant="ghost" size="icon" className={`hover:text-red-600 ${post.userVote == "downvote" && "text-red-500"}`} onClick={() => handleVote("downvote")}>
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
                <div className="grid gap-4 fade-in-up">
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} openModal={openDeleteModal} />
                    ))}
                </div>

 )}    
      </div>
    )}

    {/* Delete confirmation folder */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Delete Comment"
        description="Are you sure you want to delete this comment?"
        actionButtons={
          <>
            <button
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteComment}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
                 {isDeleteLoading ? <Spinner size={5} color="white" /> : "Delete comment"} 
            </button>
          </>
        }
      />
            </main>
    );    
};

export default PostPage;