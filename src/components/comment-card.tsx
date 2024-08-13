import {Comment} from "@/lib/types";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {XIcon} from "lucide-react";
import {capitaliseFirstLetter, getDaysAgo} from "@/lib/utils";

/**
 * Displays a comment with author details and content.
 */
export default function CommentCard({ comment, openModal }: {
    comment: Comment;
    openModal: (id: number) => void;
}) {
    return (
        <div className="flex items-center justify-between border border-border rounded-md p-4">
            <div className="flex flex-col">
                <div className="flex items-start gap-4">
                    <Avatar className="size-8">
                        <AvatarFallback>{comment.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{comment.author}</div>
                        <div
                            className="text-muted-foreground text-sm">{ capitaliseFirstLetter(getDaysAgo(comment.createdAt))}</div>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm mt-4">{comment.content}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-600" onClick={() => openModal(comment.id)}>
                <XIcon className="size-5" />
            </Button>
        </div>
    );
}