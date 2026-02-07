import type { Book, BookStatus } from '../types';

/**
 * Book Model - Client-side model with display logic
 * Contains no API calls or View imports
 * Only business logic for UI display and formatting
 */
export class BookModel {
  id: string;
  isbn: string;
  title: string;
  author: string;
  description: string | null;
  genre: string;
  publishedYear: number | null;
  status: BookStatus;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(data: Book) {
    this.id = data.id;
    this.isbn = data.isbn;
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.genre = data.genre;
    this.publishedYear = data.publishedYear;
    this.status = data.status;
    this.isAvailable = data.isAvailable;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Check if book is available for borrowing
   * Display logic only - business validation is on backend
   */
  isAvailableForBorrow(): boolean {
    return this.status === 'AVAILABLE';
  }

  /**
   * Get display title with truncation if too long
   * UI formatting logic
   */
  getDisplayTitle(maxLength: number = 50): string {
    if (this.title.length <= maxLength) {
      return this.title;
    }
    return this.title.substring(0, maxLength - 3) + '...';
  }

  /**
   * Get status color for UI display
   * UI formatting logic
   */
  getStatusColor(): string {
    switch (this.status) {
      case 'AVAILABLE':
        return '#28a745';
      case 'BORROWED':
        return '#dc3545';
      case 'RESERVED':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  }

  /**
   * Get status text with icon
   * UI formatting logic
   */
  getStatusDisplay(): string {
    switch (this.status) {
      case 'AVAILABLE':
        return '✓ Available';
      case 'BORROWED':
        return '✗ Borrowed';
      case 'RESERVED':
        return '⏳ Reserved';
      default:
        return this.status;
    }
  }

  /**
   * Get formatted description with truncation
   * UI formatting logic
   */
  getDisplayDescription(maxLength: number = 100): string {
    if (!this.description) {
      return 'No description available';
    }
    if (this.description.length <= maxLength) {
      return this.description;
    }
    return this.description.substring(0, maxLength - 3) + '...';
  }

  /**
   * Get formatted published year
   * UI formatting logic
   */
  getDisplayYear(): string {
    return this.publishedYear ? this.publishedYear.toString() : 'Unknown';
  }

  /**
   * Get formatted created date
   * UI formatting logic
   */
  getDisplayCreatedDate(): string {
    return new Date(this.createdAt).toLocaleDateString('en-US');
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): Book {
    return {
      id: this.id,
      isbn: this.isbn,
      title: this.title,
      author: this.author,
      description: this.description,
      genre: this.genre,
      publishedYear: this.publishedYear,
      status: this.status,
      isAvailable: this.isAvailable,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
