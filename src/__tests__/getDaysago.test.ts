// tests/getDaysAgo.test.ts

// Test for the utility function that returns the number of days a post/comment was made
import { describe, it, expect } from 'vitest';
import { getDaysAgo } from "../lib/utils";

describe('getDaysAgo', () => {
  it('should return "1 day ago" when the date is 1 day before today', () => {
    const result = getDaysAgo(new Date(Date.now() - 86400000).toISOString());
    expect(result).toBe('1 day ago');
  });

  it('should return "today" when the date is today', () => {
    const result = getDaysAgo(new Date().toISOString());
    expect(result).toBe('today');
  });

  it('should return "in the future" when the date is in the future', () => {
    const result = getDaysAgo(new Date(Date.now() + 86400000).toISOString());
    expect(result).toBe('in the future');
  });
});
