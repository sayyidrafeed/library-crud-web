import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { bookStore, availableBooks, filteredBooks, isLoading, hasError } from '@/stores/bookStore';
import { mockBooks } from '../../mocks/bookData.mock';

/**
 * BookStore Tests
 * 
 * Tests for bookStore state management
 * Follows backend pattern: test state transitions, pure functions
 */
describe('bookStore', () => {
  beforeEach(() => {
    bookStore.reset();
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const state = get(bookStore);

      expect(state.books).toEqual([]);
      expect(state.selectedBook).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.success).toBeNull();
      expect(state.filters).toEqual({});
      expect(state.pagination).toEqual({
        page: 1,
        pageSize: 20,
        total: 0
      });
    });
  });

  describe('setBooks', () => {
    it('should update books and total', () => {
      bookStore.setBooks(mockBooks, 10);

      const state = get(bookStore);

      expect(state.books).toEqual(mockBooks);
      expect(state.pagination.total).toBe(10);
    });

    it('should preserve other state properties', () => {
      bookStore.selectBook(mockBooks[0]);
      bookStore.setLoading(true);
      bookStore.setBooks(mockBooks, 10);

      const state = get(bookStore);

      expect(state.selectedBook).toEqual(mockBooks[0]);
      expect(state.loading).toBe(true);
    });
  });

  describe('selectBook', () => {
    it('should select a book', () => {
      bookStore.selectBook(mockBooks[0]);

      const state = get(bookStore);

      expect(state.selectedBook).toEqual(mockBooks[0]);
    });

    it('should deselect book when null is passed', () => {
      bookStore.selectBook(mockBooks[0]);
      bookStore.selectBook(null);

      const state = get(bookStore);

      expect(state.selectedBook).toBeNull();
    });

    it('should replace previously selected book', () => {
      bookStore.selectBook(mockBooks[0]);
      bookStore.selectBook(mockBooks[1]);

      const state = get(bookStore);

      expect(state.selectedBook).toEqual(mockBooks[1]);
    });
  });

  describe('setLoading', () => {
    it('should set loading to true', () => {
      bookStore.setLoading(true);

      expect(get(bookStore).loading).toBe(true);
    });

    it('should set loading to false', () => {
      bookStore.setLoading(true);
      bookStore.setLoading(false);

      expect(get(bookStore).loading).toBe(false);
    });

    it('should preserve other state properties', () => {
      bookStore.setBooks(mockBooks, 10);
      bookStore.setLoading(true);

      const state = get(bookStore);

      expect(state.books).toEqual(mockBooks);
    });
  });

  describe('setError', () => {
    it('should set error and clear success', () => {
      bookStore.setSuccess('Success message');
      bookStore.setError('Error message');

      const state = get(bookStore);

      expect(state.error).toBe('Error message');
      expect(state.success).toBeNull();
    });

    it('should clear error when null is passed', () => {
      bookStore.setError('Error message');
      bookStore.setError(null);

      const state = get(bookStore);

      expect(state.error).toBeNull();
    });
  });

  describe('setSuccess', () => {
    it('should set success and clear error', () => {
      bookStore.setError('Error message');
      bookStore.setSuccess('Success message');

      const state = get(bookStore);

      expect(state.success).toBe('Success message');
      expect(state.error).toBeNull();
    });

    it('should clear success when null is passed', () => {
      bookStore.setSuccess('Success message');
      bookStore.setSuccess(null);

      const state = get(bookStore);

      expect(state.success).toBeNull();
    });
  });

  describe('setFilters', () => {
    it('should update filters', () => {
      bookStore.setFilters({ genre: 'Fiction' });

      const state = get(bookStore);

      expect(state.filters).toEqual({ genre: 'Fiction' });
    });

    it('should merge filters', () => {
      bookStore.setFilters({ genre: 'Fiction' });
      bookStore.setFilters({ status: 'AVAILABLE' });

      const state = get(bookStore);

      expect(state.filters).toEqual({
        genre: 'Fiction',
        status: 'AVAILABLE'
      });
    });

    it('should reset page to 1', () => {
      bookStore.setPage(3);
      bookStore.setFilters({ genre: 'Fiction' });

      expect(get(bookStore).pagination.page).toBe(1);
    });

    it('should preserve other filters when updating one', () => {
      bookStore.setFilters({ genre: 'Fiction', status: 'AVAILABLE' });
      bookStore.setFilters({ search: 'test' });

      const state = get(bookStore);

      expect(state.filters).toEqual({
        genre: 'Fiction',
        status: 'AVAILABLE',
        search: 'test'
      });
    });
  });

  describe('setPage', () => {
    it('should update page', () => {
      bookStore.setPage(5);

      expect(get(bookStore).pagination.page).toBe(5);
    });

    it('should preserve other pagination properties', () => {
      bookStore.setPageSize(50);
      bookStore.setPage(5);

      const state = get(bookStore);

      expect(state.pagination.pageSize).toBe(50);
    });
  });

  describe('setPageSize', () => {
    it('should update page size', () => {
      bookStore.setPageSize(50);

      expect(get(bookStore).pagination.pageSize).toBe(50);
    });

    it('should reset page to 1', () => {
      bookStore.setPage(3);
      bookStore.setPageSize(50);

      expect(get(bookStore).pagination.page).toBe(1);
    });
  });

  describe('addBook', () => {
    it('should add book to beginning of list', () => {
      bookStore.setBooks([mockBooks[1]], 1);
      bookStore.addBook(mockBooks[0]);

      const state = get(bookStore);

      expect(state.books[0]).toEqual(mockBooks[0]);
      expect(state.books[1]).toEqual(mockBooks[1]);
    });

    it('should increment total', () => {
      bookStore.setBooks([mockBooks[1]], 1);
      bookStore.addBook(mockBooks[0]);

      expect(get(bookStore).pagination.total).toBe(2);
    });

    it('should preserve other state properties', () => {
      bookStore.selectBook(mockBooks[1]);
      bookStore.addBook(mockBooks[0]);

      const state = get(bookStore);

      expect(state.selectedBook).toEqual(mockBooks[1]);
    });
  });

  describe('updateBook', () => {
    it('should update book in list', () => {
      bookStore.setBooks(mockBooks, 4);
      const updatedBook = { ...mockBooks[0], title: 'Updated Title' };
      bookStore.updateBook('book-1', updatedBook);

      const state = get(bookStore);

      expect(state.books[0]).toEqual(updatedBook);
    });

    it('should update selected book if matches', () => {
      bookStore.setBooks(mockBooks, 4);
      bookStore.selectBook(mockBooks[0]);
      const updatedBook = { ...mockBooks[0], title: 'Updated Title' };
      bookStore.updateBook('book-1', updatedBook);

      expect(get(bookStore).selectedBook).toEqual(updatedBook);
    });

    it('should not update selected book if different ID', () => {
      bookStore.setBooks(mockBooks, 4);
      bookStore.selectBook(mockBooks[1]);
      const updatedBook = { ...mockBooks[0], title: 'Updated Title' };
      bookStore.updateBook('book-1', updatedBook);

      expect(get(bookStore).selectedBook).toEqual(mockBooks[1]);
    });

    it('should not modify other books', () => {
      bookStore.setBooks(mockBooks, 4);
      const updatedBook = { ...mockBooks[0], title: 'Updated Title' };
      bookStore.updateBook('book-1', updatedBook);

      const state = get(bookStore);

      expect(state.books[1]).toEqual(mockBooks[1]);
      expect(state.books[2]).toEqual(mockBooks[2]);
      expect(state.books[3]).toEqual(mockBooks[3]);
    });
  });

  describe('removeBook', () => {
    it('should remove book from list', () => {
      bookStore.setBooks(mockBooks, 4);
      bookStore.removeBook('book-1');

      const state = get(bookStore);

      expect(state.books).toHaveLength(3);
      expect(state.books[0]).toEqual(mockBooks[1]);
      expect(state.books[1]).toEqual(mockBooks[2]);
      expect(state.books[2]).toEqual(mockBooks[3]);
    });

    it('should clear selected book if matches', () => {
      bookStore.setBooks(mockBooks, 4);
      bookStore.selectBook(mockBooks[0]);
      bookStore.removeBook('book-1');

      expect(get(bookStore).selectedBook).toBeNull();
    });

    it('should not clear selected book if different ID', () => {
      bookStore.setBooks(mockBooks, 4);
      bookStore.selectBook(mockBooks[1]);
      bookStore.removeBook('book-1');

      expect(get(bookStore).selectedBook).toEqual(mockBooks[1]);
    });

    it('should decrement total', () => {
      bookStore.setBooks(mockBooks, 4);
      bookStore.removeBook('book-1');

      expect(get(bookStore).pagination.total).toBe(3);
    });
  });

  describe('reset', () => {
    it('should return to initial state', () => {
      bookStore.setBooks(mockBooks, 4);
      bookStore.selectBook(mockBooks[0]);
      bookStore.setLoading(true);
      bookStore.setError('Error');
      bookStore.setFilters({ genre: 'Fiction' });
      bookStore.setPage(3);
      bookStore.reset();

      const state = get(bookStore);

      expect(state.books).toEqual([]);
      expect(state.selectedBook).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.success).toBeNull();
      expect(state.filters).toEqual({});
      expect(state.pagination).toEqual({
        page: 1,
        pageSize: 20,
        total: 0
      });
    });
  });

  describe('derived stores', () => {
    describe('availableBooks', () => {
      it('should filter books by availability', () => {
        bookStore.setBooks(mockBooks, 4);

        expect(get(availableBooks)).toHaveLength(2);
        expect(get(availableBooks)[0]).toEqual(mockBooks[0]);
        expect(get(availableBooks)[1]).toEqual(mockBooks[3]);
      });

      it('should return empty array when no books', () => {
        expect(get(availableBooks)).toHaveLength(0);
      });
    });

    describe('filteredBooks', () => {
      it('should filter by genre', () => {
        bookStore.setBooks(mockBooks, 4);
        bookStore.setFilters({ genre: 'Fiction' });

        expect(get(filteredBooks)).toHaveLength(2);
        expect(get(filteredBooks)[0]).toEqual(mockBooks[0]);
        expect(get(filteredBooks)[1]).toEqual(mockBooks[3]);
      });

      it('should filter by status', () => {
        bookStore.setBooks(mockBooks, 4);
        bookStore.setFilters({ status: 'AVAILABLE' });

        expect(get(filteredBooks)).toHaveLength(2);
        expect(get(filteredBooks)[0]).toEqual(mockBooks[0]);
        expect(get(filteredBooks)[1]).toEqual(mockBooks[3]);
      });

      it('should filter by search', () => {
        bookStore.setBooks(mockBooks, 4);
        bookStore.setFilters({ search: 'Book 1' });

        expect(get(filteredBooks)).toHaveLength(1);
        expect(get(filteredBooks)[0]).toEqual(mockBooks[0]);
      });

      it('should apply multiple filters', () => {
        bookStore.setBooks(mockBooks, 4);
        bookStore.setFilters({ genre: 'Fiction', status: 'AVAILABLE' });

        expect(get(filteredBooks)).toHaveLength(2);
        expect(get(filteredBooks)[0]).toEqual(mockBooks[0]);
        expect(get(filteredBooks)[1]).toEqual(mockBooks[3]);
      });

      it('should return all books when no filters', () => {
        bookStore.setBooks(mockBooks, 4);

        expect(get(filteredBooks)).toHaveLength(4);
      });
    });

    describe('isLoading', () => {
      it('should reflect loading state', () => {
        expect(get(isLoading)).toBe(false);
        bookStore.setLoading(true);
        expect(get(isLoading)).toBe(true);
      });
    });

    describe('hasError', () => {
      it('should reflect error state', () => {
        expect(get(hasError)).toBe(false);
        bookStore.setError('Error');
        expect(get(hasError)).toBe(true);
      });
    });
  });
});
