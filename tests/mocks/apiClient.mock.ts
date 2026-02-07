import { vi } from 'vitest';
import type { Book, BookListResponse, DashboardStats, RecentActivity } from '@/types';

/**
 * Mock API Client
 * 
 * Provides mocked API responses for testing services
 * Follows backend pattern of isolating external dependencies
 */
export const mockApiClient = {
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn()
};

export function mockGetBooks(books: Book[], total: number) {
  mockApiClient.get.mockResolvedValue({
    books,
    total,
    page: 1,
    pageSize: 20
  });
}

export function mockGetBook(book: Book) {
  mockApiClient.get.mockResolvedValue(book);
}

export function mockCreateBook(book: Book) {
  mockApiClient.post.mockResolvedValue(book);
}

export function mockUpdateBook(book: Book) {
  mockApiClient.patch.mockResolvedValue(book);
}

export function mockDeleteBook() {
  mockApiClient.delete.mockResolvedValue({ message: 'Book deleted successfully' });
}

export function mockGetDashboardStats(stats: DashboardStats) {
  mockApiClient.get.mockResolvedValue(stats);
}

export function mockGetRecentActivity(activity: RecentActivity[]) {
  mockApiClient.get.mockResolvedValue(activity);
}

export function mockApiError(message: string, status: number = 500) {
  const error = new Error(message) as any;
  error.status = status;
  mockApiClient.get.mockRejectedValue(error);
  mockApiClient.post.mockRejectedValue(error);
  mockApiClient.patch.mockRejectedValue(error);
  mockApiClient.delete.mockRejectedValue(error);
}

export function mockNotFoundError(message: string = 'Not found') {
  const error = new Error(message) as any;
  error.status = 404;
  mockApiClient.get.mockRejectedValue(error);
  mockApiClient.post.mockRejectedValue(error);
  mockApiClient.patch.mockRejectedValue(error);
  mockApiClient.delete.mockRejectedValue(error);
}

export function mockValidationError(message: string = 'Validation error') {
  const error = new Error(message) as any;
  error.status = 400;
  mockApiClient.get.mockRejectedValue(error);
  mockApiClient.post.mockRejectedValue(error);
  mockApiClient.patch.mockRejectedValue(error);
  mockApiClient.delete.mockRejectedValue(error);
}

export function clearAllMocks() {
  mockApiClient.get.mockClear();
  mockApiClient.post.mockClear();
  mockApiClient.patch.mockClear();
  mockApiClient.delete.mockClear();
}
