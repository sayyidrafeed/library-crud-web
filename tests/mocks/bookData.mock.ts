import type { Book, BookListResponse, CreateBookRequest, UpdateBookRequest } from '@/types';

/**
 * Mock Book Data
 * 
 * Provides sample book objects for testing
 * Follows backend pattern of clear, descriptive mock data
 */
export const mockBooks: Book[] = [
  {
    id: 'book-1',
    isbn: '9781234567890',
    title: 'Test Book 1',
    author: 'Test Author 1',
    description: 'A test book description',
    genre: 'Fiction',
    publishedYear: 2020,
    status: 'AVAILABLE',
    isAvailable: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'book-2',
    isbn: '9781234567891',
    title: 'Test Book 2',
    author: 'Test Author 2',
    description: null,
    genre: 'Non-Fiction',
    publishedYear: 2021,
    status: 'BORROWED',
    isAvailable: false,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 'book-3',
    isbn: '9781234567892',
    title: 'Test Book 3',
    author: 'Test Author 3',
    description: 'Another test book description',
    genre: 'Science',
    publishedYear: 2022,
    status: 'RESERVED',
    isAvailable: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  },
  {
    id: 'book-4',
    isbn: '9781234567893',
    title: 'Test Book 4',
    author: 'Test Author 4',
    description: 'A very long description that should be truncated when displayed because it exceeds the maximum length allowed for the description field in the UI',
    genre: 'Fiction',
    publishedYear: null,
    status: 'AVAILABLE',
    isAvailable: true,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z'
  }
];

export const mockBookListResponse: BookListResponse = {
  books: mockBooks,
  total: 4,
  page: 1,
  pageSize: 20
};

export const mockCreateBookRequest: CreateBookRequest = {
  isbn: '9781234567894',
  title: 'New Book',
  author: 'New Author',
  genre: 'Science',
  description: 'A new book description',
  publishedYear: 2023
};

export const mockUpdateBookRequest: UpdateBookRequest = {
  title: 'Updated Title',
  author: 'Updated Author',
  description: 'Updated description',
  genre: 'Updated Genre'
};

export const mockBookWithoutDescription: Book = {
  id: 'book-5',
  isbn: '9781234567895',
  title: 'Book Without Description',
  author: 'Test Author',
  description: null,
  genre: 'Fiction',
  publishedYear: 2020,
  status: 'AVAILABLE',
  isAvailable: true,
  createdAt: '2024-01-05T00:00:00.000Z',
  updatedAt: '2024-01-05T00:00:00.000Z'
};

export const mockBookWithoutYear: Book = {
  id: 'book-6',
  isbn: '9781234567896',
  title: 'Book Without Year',
  author: 'Test Author',
  description: 'A test description',
  genre: 'Fiction',
  publishedYear: null,
  status: 'AVAILABLE',
  isAvailable: true,
  createdAt: '2024-01-06T00:00:00.000Z',
  updatedAt: '2024-01-06T00:00:00.000Z'
};

export const mockBookWithLongTitle: Book = {
  id: 'book-7',
  isbn: '9781234567897',
  title: 'This is a very long book title that should be truncated when displayed in the UI because it exceeds the maximum length allowed for titles',
  author: 'Test Author',
  description: 'A test description',
  genre: 'Fiction',
  publishedYear: 2020,
  status: 'AVAILABLE',
  isAvailable: true,
  createdAt: '2024-01-07T00:00:00.000Z',
  updatedAt: '2024-01-07T00:00:00.000Z'
};
