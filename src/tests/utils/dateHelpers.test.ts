import { describe, it, expect } from 'vitest';
import {
  getDayName,
  getShortDayName,
  formatDate,
  formatTime,
  getStartOfDay,
  isSameDay,
} from '@utils/dateHelpers';

describe('dateHelpers', () => {
  // Use a fixed timestamp for testing: January 15, 2024, 12:00:00 (Monday)
  const testTimestamp = 1705324800;

  describe('getDayName', () => {
    it('should return full day name', () => {
      const dayName = getDayName(testTimestamp);
      expect(dayName).toBe('Monday');
    });
  });

  describe('getShortDayName', () => {
    it('should return short day name', () => {
      const shortDayName = getShortDayName(testTimestamp);
      expect(shortDayName).toBe('Mon');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const formatted = formatDate(testTimestamp);
      // Format should be like "Jan 15, 2024"
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const formatted = formatTime(testTimestamp);
      // Should contain time format
      expect(formatted).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
    });
  });

  describe('getStartOfDay', () => {
    it('should return start of day timestamp', () => {
      const startOfDay = getStartOfDay(testTimestamp);
      const date = new Date(startOfDay * 1000);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
    });
  });

  describe('isSameDay', () => {
    it('should return true for timestamps on the same day', () => {
      const timestamp1 = testTimestamp;
      const timestamp2 = testTimestamp + 3600; // 1 hour later
      expect(isSameDay(timestamp1, timestamp2)).toBe(true);
    });

    it('should return false for timestamps on different days', () => {
      const timestamp1 = testTimestamp;
      const timestamp2 = testTimestamp + 86400; // 1 day later
      expect(isSameDay(timestamp1, timestamp2)).toBe(false);
    });
  });
});

