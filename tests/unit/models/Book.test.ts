import { describe, it, expect } from 'vitest';
import { BookModel } from '@/models/Book';
import { mockBooks, mockBookWithoutDescription, mockBookWithoutYear, mockBookWithLongTitle } from '../../mocks/bookData.mock';

/**
 * BookModel Tests
 * 
 * Tests for BookModel display logic methods
 * Follows backend pattern: pure unit tests, no external dependencies
 */
describe('BookModel', () => {
  describe('constructor', () => {
    it('should create instance with valid data', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.id).toBe('book-1');
      expect(book.isbn).toBe('9781234567890');
      expect(book.title).toBe('Test Book 1');
      expect(book.author).toBe('Test Author 1');
      expect(book.description).toBe('A test book description');
      expect(book.genre).toBe('Fiction');
      expect(book.publishedYear).toBe(2020);
      expect(book.status).toBe('AVAILABLE');
      expect(book.isAvailable).toBe(true);
    });

    it('should create instance with null description', () => {
      const book = new BookModel(mockBooks[1]);

      expect(book.description).toBeNull();
    });

    it('should create instance with null publishedYear', () => {
      const book = new BookModel(mockBooks[3]);

      expect(book.publishedYear).toBeNull();
    });
  });

  describe('isAvailableForBorrow', () => {
    it('should return true when status is AVAILABLE', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.isAvailableForBorrow()).toBe(true);
    });

    it('should return false when status is BORROWED', () => {
      const book = new BookModel(mockBooks[1]);

      expect(book.isAvailableForBorrow()).toBe(false);
    });

    it('should return false when status is RESERVED', () => {
      const book = new BookModel(mockBooks[2]);

      expect(book.isAvailableForBorrow()).toBe(false);
    });
  });

  describe('getDisplayTitle', () => {
    it('should return full title when under max length', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getDisplayTitle(50)).toBe('Test Book 1');
    });

    it('should truncate title when over max length', () => {
      const book = new BookModel(mockBookWithLongTitle);

      expect(book.getDisplayTitle(50)).toBe('This is a very long book title that should be t...');
    });

    it('should use default max length of 50', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getDisplayTitle()).toBe('Test Book 1');
    });
  });

  describe('getStatusColor', () => {
    it('should return green for AVAILABLE status', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getStatusColor()).toBe('#28a745');
    });

    it('should return red for BORROWED status', () => {
      const book = new BookModel(mockBooks[1]);

      expect(book.getStatusColor()).toBe('#dc3545');
    });

    it('should return yellow for RESERVED status', () => {
      const book = new BookModel(mockBooks[2]);

      expect(book.getStatusColor()).toBe('#ffc107');
    });
  });

  describe('getStatusDisplay', () => {
    it('should return available display text for AVAILABLE status', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getStatusDisplay()).toBe('✓ Available');
    });

    it('should return borrowed display text for BORROWED status', () => {
      const book = new BookModel(mockBooks[1]);

      expect(book.getStatusDisplay()).toBe('✗ Borrowed');
    });

    it('should return reserved display text for RESERVED status', () => {
      const book = new BookModel(mockBooks[2]);

      expect(book.getStatusDisplay()).toBe('⏳ Reserved');
    });
  });

  describe('getDisplayDescription', () => {
    it('should return description when exists', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getDisplayDescription(100)).toBe('A test book description');
    });

    it('should return placeholder when description is null', () => {
      const book = new BookModel(mockBookWithoutDescription);

      expect(book.getDisplayDescription(100)).toBe('No description available');
    });

    it('should truncate long description', () => {
      const book = new BookModel(mockBooks[3]);

      expect(book.getDisplayDescription(50)).toBe('A very long description that should be truncate...');
    });

    it('should use default max length of 100', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getDisplayDescription()).toBe('A test book description');
    });
  });

  describe('getDisplayYear', () => {
    it('should return year when exists', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getDisplayYear()).toBe('2020');
    });

    it('should return Unknown when year is null', () => {
      const book = new BookModel(mockBookWithoutYear);

      expect(book.getDisplayYear()).toBe('Unknown');
    });
  });

  describe('getDisplayCreatedDate', () => {
    it('should format date correctly', () => {
      const book = new BookModel(mockBooks[0]);

      expect(book.getDisplayCreatedDate()).toBe('1/1/2024');
    });

    it('should format date for different dates', () => {
      const book = new BookModel(mockBooks[1]);

      expect(book.getDisplayCreatedDate()).toBe('1/2/2024');
    });
  });

  describe('toJSON', () => {
    it('should serialize to plain object', () => {
      const book = new BookModel(mockBooks[0]);
      const json = book.toJSON();

      expect(json).toEqual(mockBooks[0]);
      expect(json).not.toBeInstanceOf(BookModel);
    });

    it('should serialize null values correctly', () => {
      const book = new BookModel(mockBookWithoutDescription);
      const json = book.toJSON();

      expect(json.description).toBeNull();
    });
  });
});
