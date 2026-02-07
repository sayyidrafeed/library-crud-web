import { bookStore } from '../stores/bookStore';
import { uiStore } from '../stores/uiStore';
import { bookService } from '../services/bookService';
import type { CreateBookRequest, UpdateBookRequest } from '../types';

/**
 * Book Controller - Coordinates between user actions, services, and stores
 * No business rules - only input validation and coordination
 */
export class BookController {
  private store = bookStore;
  private uiStore = uiStore;
  private service = bookService;

  /**
   * Load all books with pagination and filters
   */
  async loadBooks(page: number = 1, pageSize: number = 20) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const response = await this.service.getAll(
        page,
        pageSize,
        this.getFilters()
      );

      this.store.setBooks(response.books, response.total);
      this.store.setPage(page);
      this.store.setPageSize(pageSize);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load books';
      this.store.setError(message);
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Search books by query
   */
  async searchBooks(query: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const response = await this.service.search(query);
      this.store.setBooks(response.books, response.total);
      this.store.setFilters({ search: query });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Search failed';
      this.store.setError(message);
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Load a single book by ID
   */
  async loadBook(id: string) {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const book = await this.service.getById(id);
      this.store.selectBook(book);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load book';
      this.uiStore.setError(message);
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Create a new book
   * Input validation only - business rules in backend
   */
  async createBook(data: CreateBookRequest) {
    // Format validation (not business logic)
    if (!data.isbn || !data.title || !data.author || !data.genre) {
      throw new Error('ISBN, title, author, and genre are required');
    }

    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const book = await this.service.create(data);
      this.store.addBook(book);
      this.uiStore.setSuccess('Book created successfully');
      return book;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create book';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Update an existing book
   */
  async updateBook(id: string, data: UpdateBookRequest) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const book = await this.service.update(id, data);
      this.store.updateBook(id, book);
      this.uiStore.setSuccess('Book updated successfully');
      return book;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update book';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Delete a book
   */
  async deleteBook(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      await this.service.delete(id);
      this.store.removeBook(id);
      this.uiStore.setSuccess('Book deleted successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete book';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Select a book
   */
  selectBook(book: any) {
    this.store.selectBook(book);
  }

  /**
   * Set filter
   */
  setFilter(key: string, value: string | undefined) {
    this.store.setFilters({ [key]: value });
  }

  /**
   * Set page
   */
  setPage(page: number) {
    this.store.setPage(page);
    this.loadBooks(page);
  }

  /**
   * Get current filters
   */
  private getFilters() {
    const filters: any = {};
    // Get filters from store
    return filters;
  }

  /**
   * Reset controller state
   */
  reset() {
    this.store.reset();
  }
}

// Export singleton instance
export const bookController = new BookController();
