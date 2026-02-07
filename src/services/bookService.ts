import { apiClient } from './apiClient';
import type {
  Book,
  BookListResponse,
  CreateBookRequest,
  UpdateBookRequest
} from '../types';

/**
 * Book Service - Pure API functions for book operations
 * No business logic - only HTTP requests
 */
export const bookService = {
  /**
   * Get all books with pagination and filters
   */
  async getAll(
    page: number = 1,
    pageSize: number = 20,
    filters?: { genre?: string; status?: string; search?: string }
  ): Promise<BookListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString()
    });

    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    return apiClient.get<BookListResponse>(`/books?${params.toString()}`);
  },

  /**
   * Get book by ID
   */
  async getById(id: string): Promise<Book> {
    return apiClient.get<Book>(`/books/${id}`);
  },

  /**
   * Search books by query
   */
  async search(query: string, page: number = 1, pageSize: number = 20): Promise<BookListResponse> {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      pageSize: pageSize.toString()
    });

    return apiClient.get<BookListResponse>(`/books/search?${params.toString()}`);
  },

  /**
   * Create a new book
   */
  async create(data: CreateBookRequest): Promise<Book> {
    return apiClient.post<Book>('/books', data);
  },

  /**
   * Update an existing book
   */
  async update(id: string, data: UpdateBookRequest): Promise<Book> {
    return apiClient.patch<Book>(`/books/${id}`, data);
  },

  /**
   * Delete a book
   */
  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/books/${id}`);
  }
};
