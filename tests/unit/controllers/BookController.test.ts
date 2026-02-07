import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookController } from '@/controllers/BookController';
import { bookStore } from '@/stores/bookStore';
import { uiStore } from '@/stores/uiStore';
import { bookService } from '@/services/bookService';
import { mockBooks, mockBookListResponse, mockCreateBookRequest, mockUpdateBookRequest } from '../../mocks/bookData.mock';

/**
 * BookController Tests
 * 
 * Tests for BookController coordination logic
 * Follows backend pattern: mock dependencies, test coordination
 */
vi.mock('@/stores/bookStore');
vi.mock('@/stores/uiStore');
vi.mock('@/services/bookService');

describe('BookController', () => {
  let controller: BookController;

  beforeEach(() => {
    controller = new BookController();
    vi.clearAllMocks();
  });

  describe('loadBooks', () => {
    it('should load books and update store', async () => {
      vi.mocked(bookService.getAll).mockResolvedValue(mockBookListResponse);

      await controller.loadBooks(1, 20);

      expect(bookStore.setLoading).toHaveBeenCalledWith(true);
      expect(bookService.getAll).toHaveBeenCalledWith(1, 20, {});
      expect(bookStore.setBooks).toHaveBeenCalledWith(mockBooks, 4);
      expect(bookStore.setPage).toHaveBeenCalledWith(1);
      expect(bookStore.setPageSize).toHaveBeenCalledWith(20);
      expect(bookStore.setLoading).toHaveBeenCalledWith(false);
    });

    it('should handle errors', async () => {
      const error = new Error('Failed to load books');
      vi.mocked(bookService.getAll).mockRejectedValue(error);

      await controller.loadBooks();

      expect(bookStore.setError).toHaveBeenCalledWith('Failed to load books');
      expect(bookStore.setLoading).toHaveBeenCalledWith(false);
    });

    it('should clear error before loading', async () => {
      vi.mocked(bookService.getAll).mockResolvedValue(mockBookListResponse);

      await controller.loadBooks();

      expect(bookStore.setError).toHaveBeenCalledWith(null);
    });
  });

  describe('searchBooks', () => {
    it('should search books and update store', async () => {
      vi.mocked(bookService.search).mockResolvedValue(mockBookListResponse);

      await controller.searchBooks('test');

      expect(bookStore.setLoading).toHaveBeenCalledWith(true);
      expect(bookService.search).toHaveBeenCalledWith('test');
      expect(bookStore.setBooks).toHaveBeenCalledWith(mockBooks, 4);
      expect(bookStore.setFilters).toHaveBeenCalledWith({ search: 'test' });
      expect(bookStore.setLoading).toHaveBeenCalledWith(false);
    });

    it('should handle search errors', async () => {
      const error = new Error('Search failed');
      vi.mocked(bookService.search).mockRejectedValue(error);

      await controller.searchBooks('test');

      expect(bookStore.setError).toHaveBeenCalledWith('Search failed');
    });

    it('should clear error before searching', async () => {
      vi.mocked(bookService.search).mockResolvedValue(mockBookListResponse);

      await controller.searchBooks('test');

      expect(bookStore.setError).toHaveBeenCalledWith(null);
    });
  });

  describe('loadBook', () => {
    it('should load single book and select it', async () => {
      vi.mocked(bookService.getById).mockResolvedValue(mockBooks[0]);

      await controller.loadBook('book-1');

      expect(uiStore.setLoading).toHaveBeenCalledWith(true);
      expect(bookService.getById).toHaveBeenCalledWith('book-1');
      expect(bookStore.selectBook).toHaveBeenCalledWith(mockBooks[0]);
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });

    it('should handle load errors', async () => {
      const error = new Error('Book not found');
      vi.mocked(bookService.getById).mockRejectedValue(error);

      await controller.loadBook('invalid-id');

      expect(uiStore.setError).toHaveBeenCalledWith('Book not found');
    });

    it('should clear error before loading', async () => {
      vi.mocked(bookService.getById).mockResolvedValue(mockBooks[0]);

      await controller.loadBook('book-1');

      expect(uiStore.setError).toHaveBeenCalledWith(null);
    });
  });

  describe('createBook', () => {
    it('should create book with valid data', async () => {
      vi.mocked(bookService.create).mockResolvedValue(mockBooks[0]);

      const result = await controller.createBook(mockCreateBookRequest);

      expect(bookStore.setLoading).toHaveBeenCalledWith(true);
      expect(bookService.create).toHaveBeenCalledWith(mockCreateBookRequest);
      expect(bookStore.addBook).toHaveBeenCalledWith(mockBooks[0]);
      expect(uiStore.setSuccess).toHaveBeenCalledWith('Book created successfully');
      expect(bookStore.setLoading).toHaveBeenCalledWith(false);
      expect(result).toEqual(mockBooks[0]);
    });

    it('should throw error for missing required fields', async () => {
      const invalidRequest = {
        isbn: '9781234567890',
        title: 'Test Book'
        // Missing author and genre
      };

      await expect(controller.createBook(invalidRequest as any)).rejects.toThrow(
        'ISBN, title, author, and genre are required'
      );
    });

    it('should handle create errors', async () => {
      const error = new Error('Book already exists');
      vi.mocked(bookService.create).mockRejectedValue(error);

      await expect(controller.createBook(mockCreateBookRequest)).rejects.toThrow('Book already exists');
      expect(bookStore.setError).toHaveBeenCalledWith('Book already exists');
    });

    it('should clear error before creating', async () => {
      vi.mocked(bookService.create).mockResolvedValue(mockBooks[0]);

      await controller.createBook(mockCreateBookRequest);

      expect(bookStore.setError).toHaveBeenCalledWith(null);
    });
  });

  describe('updateBook', () => {
    it('should update book', async () => {
      const updatedBook = { ...mockBooks[0], title: 'Updated Title' };
      vi.mocked(bookService.update).mockResolvedValue(updatedBook);

      const result = await controller.updateBook('book-1', mockUpdateBookRequest);

      expect(bookStore.setLoading).toHaveBeenCalledWith(true);
      expect(bookService.update).toHaveBeenCalledWith('book-1', mockUpdateBookRequest);
      expect(bookStore.updateBook).toHaveBeenCalledWith('book-1', updatedBook);
      expect(uiStore.setSuccess).toHaveBeenCalledWith('Book updated successfully');
      expect(bookStore.setLoading).toHaveBeenCalledWith(false);
      expect(result).toEqual(updatedBook);
    });

    it('should handle update errors', async () => {
      const error = new Error('Book not found');
      vi.mocked(bookService.update).mockRejectedValue(error);

      await expect(controller.updateBook('invalid-id', mockUpdateBookRequest)).rejects.toThrow('Book not found');
    });

    it('should clear error before updating', async () => {
      const updatedBook = { ...mockBooks[0], title: 'Updated Title' };
      vi.mocked(bookService.update).mockResolvedValue(updatedBook);

      await controller.updateBook('book-1', mockUpdateBookRequest);

      expect(bookStore.setError).toHaveBeenCalledWith(null);
    });
  });

  describe('deleteBook', () => {
    it('should delete book', async () => {
      vi.mocked(bookService.delete).mockResolvedValue({ message: 'Book deleted successfully' });

      await controller.deleteBook('book-1');

      expect(bookStore.setLoading).toHaveBeenCalledWith(true);
      expect(bookService.delete).toHaveBeenCalledWith('book-1');
      expect(bookStore.removeBook).toHaveBeenCalledWith('book-1');
      expect(uiStore.setSuccess).toHaveBeenCalledWith('Book deleted successfully');
      expect(bookStore.setLoading).toHaveBeenCalledWith(false);
    });

    it('should handle delete errors', async () => {
      const error = new Error('Book not found');
      vi.mocked(bookService.delete).mockRejectedValue(error);

      await expect(controller.deleteBook('invalid-id')).rejects.toThrow('Book not found');
    });

    it('should clear error before deleting', async () => {
      vi.mocked(bookService.delete).mockResolvedValue({ message: 'Book deleted successfully' });

      await controller.deleteBook('book-1');

      expect(bookStore.setError).toHaveBeenCalledWith(null);
    });
  });

  describe('selectBook', () => {
    it('should select book', () => {
      controller.selectBook(mockBooks[0]);

      expect(bookStore.selectBook).toHaveBeenCalledWith(mockBooks[0]);
    });
  });

  describe('setFilter', () => {
    it('should set filter', () => {
      controller.setFilter('genre', 'Fiction');

      expect(bookStore.setFilters).toHaveBeenCalledWith({ genre: 'Fiction' });
    });

    it('should set filter to undefined', () => {
      controller.setFilter('genre', undefined);

      expect(bookStore.setFilters).toHaveBeenCalledWith({ genre: undefined });
    });
  });

  describe('setPage', () => {
    it('should set page and load books', async () => {
      vi.mocked(bookService.getAll).mockResolvedValue(mockBookListResponse);

      await controller.setPage(2);

      expect(bookStore.setPage).toHaveBeenCalledWith(2);
      expect(bookService.getAll).toHaveBeenCalled();
    });

    it('should handle page load errors', async () => {
      const error = new Error('Failed to load books');
      vi.mocked(bookService.getAll).mockRejectedValue(error);

      await controller.setPage(2);

      expect(bookStore.setError).toHaveBeenCalledWith('Failed to load books');
    });
  });

  describe('reset', () => {
    it('should reset controller state', () => {
      controller.reset();

      expect(bookStore.reset).toHaveBeenCalled();
    });
  });
});
