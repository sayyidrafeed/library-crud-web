import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { bookService } from '@/services/bookService';
import { apiClient } from '@/services/apiClient';
import { mockBooks, mockBookListResponse, mockCreateBookRequest, mockUpdateBookRequest } from '../../mocks/bookData.mock';

/**
 * BookService Tests
 * 
 * Tests for bookService API methods
 * Follows backend pattern: mock external dependencies, test pure functions
 */
vi.mock('@/services/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  }
}));

describe('bookService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all books with default pagination', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBookListResponse);

      const result = await bookService.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/books?page=1&pageSize=20');
      expect(result).toEqual(mockBookListResponse);
    });

    it('should fetch books with custom pagination', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBookListResponse);

      const result = await bookService.getAll(2, 10);

      expect(apiClient.get).toHaveBeenCalledWith('/books?page=2&pageSize=10');
      expect(result).toEqual(mockBookListResponse);
    });

    it('should fetch books with genre filter', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBookListResponse);

      const result = await bookService.getAll(1, 20, { genre: 'Fiction' });

      expect(apiClient.get).toHaveBeenCalledWith('/books?page=1&pageSize=20&genre=Fiction');
      expect(result).toEqual(mockBookListResponse);
    });

    it('should fetch books with status filter', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBookListResponse);

      const result = await bookService.getAll(1, 20, { status: 'AVAILABLE' });

      expect(apiClient.get).toHaveBeenCalledWith('/books?page=1&pageSize=20&status=AVAILABLE');
      expect(result).toEqual(mockBookListResponse);
    });

    it('should fetch books with search filter', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBookListResponse);

      const result = await bookService.getAll(1, 20, { search: 'test' });

      expect(apiClient.get).toHaveBeenCalledWith('/books?page=1&pageSize=20&search=test');
      expect(result).toEqual(mockBookListResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      (apiClient.get as Mock).mockRejectedValue(error);

      await expect(bookService.getAll()).rejects.toThrow('Network error');
    });
  });

  describe('getById', () => {
    it('should fetch book by ID', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBooks[0]);

      const result = await bookService.getById('book-1');

      expect(apiClient.get).toHaveBeenCalledWith('/books/book-1');
      expect(result).toEqual(mockBooks[0]);
    });

    it('should handle not found error', async () => {
      const error = new Error('Book not found');
      (apiClient.get as Mock).mockRejectedValue(error);

      await expect(bookService.getById('invalid-id')).rejects.toThrow('Book not found');
    });
  });

  describe('search', () => {
    it('should search books with query', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBookListResponse);

      const result = await bookService.search('test');

      expect(apiClient.get).toHaveBeenCalledWith('/books/search?q=test&page=1&pageSize=20');
      expect(result).toEqual(mockBookListResponse);
    });

    it('should search books with custom pagination', async () => {
      (apiClient.get as Mock).mockResolvedValue(mockBookListResponse);

      const result = await bookService.search('test', 2, 10);

      expect(apiClient.get).toHaveBeenCalledWith('/books/search?q=test&page=2&pageSize=10');
      expect(result).toEqual(mockBookListResponse);
    });

    it('should handle search errors', async () => {
      const error = new Error('Search failed');
      (apiClient.get as Mock).mockRejectedValue(error);

      await expect(bookService.search('test')).rejects.toThrow('Search failed');
    });
  });

  describe('create', () => {
    it('should create new book', async () => {
      (apiClient.post as Mock).mockResolvedValue(mockBooks[0]);

      const result = await bookService.create(mockCreateBookRequest);

      expect(apiClient.post).toHaveBeenCalledWith('/books', mockCreateBookRequest);
      expect(result).toEqual(mockBooks[0]);
    });

    it('should handle validation errors', async () => {
      const error = new Error('Invalid ISBN format');
      (apiClient.post as Mock).mockRejectedValue(error);

      await expect(bookService.create({
        isbn: 'invalid',
        title: 'Test',
        author: 'Test',
        genre: 'Fiction'
      })).rejects.toThrow('Invalid ISBN format');
    });
  });

  describe('update', () => {
    it('should update existing book', async () => {
      const updatedBook = { ...mockBooks[0], title: 'Updated Title' };
      (apiClient.patch as Mock).mockResolvedValue(updatedBook);

      const result = await bookService.update('book-1', mockUpdateBookRequest);

      expect(apiClient.patch).toHaveBeenCalledWith('/books/book-1', mockUpdateBookRequest);
      expect(result).toEqual(updatedBook);
    });

    it('should handle update errors', async () => {
      const error = new Error('Book not found');
      (apiClient.patch as Mock).mockRejectedValue(error);

      await expect(bookService.update('invalid-id', mockUpdateBookRequest)).rejects.toThrow('Book not found');
    });
  });

  describe('delete', () => {
    it('should delete book', async () => {
      (apiClient.delete as Mock).mockResolvedValue({ message: 'Book deleted successfully' });

      const result = await bookService.delete('book-1');

      expect(apiClient.delete).toHaveBeenCalledWith('/books/book-1');
      expect(result).toEqual({ message: 'Book deleted successfully' });
    });

    it('should handle delete errors', async () => {
      const error = new Error('Book not found');
      (apiClient.delete as Mock).mockRejectedValue(error);

      await expect(bookService.delete('invalid-id')).rejects.toThrow('Book not found');
    });
  });
});
