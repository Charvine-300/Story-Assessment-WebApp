import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ErrorResponse } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to calculate days ago 
// NOTE - I updated it to properly calculate days from present day for even 1 day as it was returning 0 for comments dropped the day before

export function getDaysAgo(dateString: string): string {
  const givenDate = new Date(dateString);
  
  // Reset the time part to 00:00:00 for both dates
  const givenDateOnly = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate());
  const currentDateOnly = new Date();
  currentDateOnly.setHours(0, 0, 0, 0); // Reset current date time to 00:00:00

  // Calculate the difference in time
  const timeDifference = currentDateOnly.getTime() - givenDateOnly.getTime();

  // Convert time difference from milliseconds to days
  const diffDays = Math.floor(timeDifference / (1000 * 3600 * 24));

  // Conditional return
  if (diffDays < 0) {
    return "in the future"; // In case the date is in the future
  } else if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "1 day ago";
  } else {
    return `${diffDays} days ago`;
  }
}


export function capitaliseFirstLetter(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Type guard function
export function isErrorResponse(error: any): error is ErrorResponse {
  return (error && typeof error.message === "string");
}

export function getAuthorInitials(authorName: string) {
  return authorName.split(" ").map(name => name[0]).join("");
}