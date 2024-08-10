import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { getDaysAgo } from './utils';

describe('getDaysAgo', () => {
    beforeEach(() => {
        // Mock the current date to a fixed value
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-08-07T12:00:00Z'));
    });

    afterEach(() => {
        // Restore the real timer after each test
        vi.useRealTimers();
    });

    it('should return "in the future" for future dates', () => {
        expect(getDaysAgo('2024-08-08')).toBe('in the future');
    });

    it('should return "today" for the current date', () => {
        expect(getDaysAgo('2024-08-07')).toBe('today');
    });

    it('should return "1 day ago" for yesterday', () => {
        expect(getDaysAgo('2024-08-06')).toBe('1 day ago');
    });

    it('should return "X days ago" for dates more than 1 day in the past', () => {
        expect(getDaysAgo('2024-08-05')).toBe('2 days ago');
        expect(getDaysAgo('2024-08-01')).toBe('6 days ago');
        expect(getDaysAgo('2024-07-08')).toBe('30 days ago');
        expect(getDaysAgo('2023-08-07')).toBe('366 days ago');
    });
});