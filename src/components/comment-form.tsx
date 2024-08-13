"use client"

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import Spinner from "@/components/ui/spinner"; // Assuming you have a Spinner component

interface CommentFormProps {
  onSubmit: (comment: string, reset: () => void) => void;
  isLoading: boolean;
}

interface CommentFormValues {
  comment: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CommentFormValues>({
    mode: "onBlur", // Trigger validation on blur
  });

  const submitHandler: SubmitHandler<CommentFormValues> = (data) => {
    onSubmit(data.comment, reset);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid gap-4 pr-4 py-5">
        <div>
          <Textarea
            placeholder="Add a comment..."
            className={`rounded-md border ${errors.comment ? 'border-red-500' : 'border-input'} bg-background text-sm`}
            {...register("comment", {
              required: "Comment is required",
              minLength: {
                value: 2,
                message: "Comment must be at least 2 characters long"
              }
            })}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>
        <div>
          <Button type="submit" disabled={isSubmitting}>
            {isLoading ? <Spinner color="white" size={5} /> : "Post Comment"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
