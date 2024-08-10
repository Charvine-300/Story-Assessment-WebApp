import Link from "next/link";
import {ArrowDownIcon, ArrowUpIcon, BookIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {CommentList, Post} from "@/lib/types";
import {promises as fs} from "fs";
import CommentCard from "@/components/comment-card";
import PostContentBlock from "@/components/post-content-block";
import {capitaliseFirstLetter, getDaysAgo} from "@/lib/utils";

export default async function PostPage() {
    const post = await fetchPost();
    const comments = await fetchComments();

    return (
            <main className="bg-background rounded-lg border p-6 grid gap-4">
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
                        <Button variant="ghost" size="icon" className={`hover:text-green-600 ${post.userVote == 'upvote' && 'text-green-500'}`}>
                            <ArrowUpIcon className="w-5 h-5" />
                        </Button>
                        <span>{post.voteCount}</span>
                        <Button variant="ghost" size="icon" className={`hover:text-red-600 ${post.userVote == 'downvote' && 'text-red-500'}`}>
                            <ArrowDownIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4 pr-4">
                    <Textarea
                        placeholder="Add a comment..."
                        className="rounded-md border border-input bg-background text-sm"
                    />
                    <div>
                        <Button>Post Comment</Button>
                    </div>
                </div>
                <div className="grid gap-4">
                    {comments.comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </main>
    );
}

// Fetch post data from a JSON file (replace with API call)
async function fetchPost(): Promise<Post> {
    const file = await fs.readFile(process.cwd() + "/public/post.json", "utf8");
    return JSON.parse(file);
}

// Fetch comments data from a JSON file (replace with API call)
async function fetchComments(): Promise<CommentList> {
    const file = await fs.readFile(process.cwd() + "/public/post-comments.json", "utf8");
    return JSON.parse(file);
}