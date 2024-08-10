import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to calculate days ago
export function getDaysAgo(dateString: string): string {
  const postDate = new Date(dateString);
  const now = new Date();

  const timeDiff = now.getTime() - postDate.getTime();
  const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

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