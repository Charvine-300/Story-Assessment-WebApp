"use client"

import { capitaliseFirstLetter, getDaysAgo } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react"
import { Button } from "./ui/button";
import { PostListItem } from "@/lib/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/state/store";
import { voteOnPost } from "@/lib/state/features/voteSlice";
import animationData from "../lotties/spinner.json"
import Lottie from "react-lottie";
import Spinner from "./ui/spinner";

function getAuthorInitials(authorName: string) {
  return authorName.split(" ").map(name => name[0]).join("");
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


const Post = ({ post }: { post: PostListItem }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [voteCount, setVoteCount] = useState(post.voteCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: string) => {
    setIsLoading(true);
    try {
      await dispatch(voteOnPost({ postId: post.id, voteType })).unwrap();

      // Update vote count based on voteType
      setVoteCount(prevCount => voteType === "upvote" ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      setIsLoading(false);
      console.error('Vote failed:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
         <article className="bg-background rounded-lg border p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                          <AvatarImage src={post.authorAvatar} alt={post.author}/>
                          <AvatarFallback>{getAuthorInitials(post.author)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                              <Link href={`/post/${post.id}`} prefetch={false}>
                                  {post.title}
                              </Link>
                          </h3>
                          <div className="text-sm text-muted-foreground">
                              {post.author} • {capitaliseFirstLetter(getDaysAgo(post.datePublished))}
                          </div>
                      </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground">
                          <Button variant="ghost" size="icon" className="text-green-600" onClick={() => handleVote("upvote")}>
                              <ArrowUpIcon className="w-5 h-5"/>
                          </Button>
                          <span>{voteCount}</span>
                          <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleVote("downvote")}>
                              <ArrowDownIcon className="w-5 h-5"/>
                          </Button>
                          {/* local loading check. For API call to vote */}
                          {isLoading && <Spinner size={5} />}
                      </div>
                      <div className="flex items-center gap-1">
                      <Link href={`/post/${post.id}`} className="text-sm text-primary hover:underline" prefetch={false}>
                          Read more
                      </Link>
                      </div>
                  </div>
              </article>
  );
};

export default Post;