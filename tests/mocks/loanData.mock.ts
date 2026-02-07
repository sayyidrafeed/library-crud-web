import type { Loan, LoanWithDetails, CreateLoanRequest } from '@/types';

/**
 * Mock Loan Data
 * 
 * Provides sample loan objects for testing
 * Follows backend pattern of clear, descriptive mock data
 */
export const mockLoans: Loan[] = [
  {
    id: 'loan-1',
    bookId: 'book-1',
    memberId: 'member-1',
    borrowedAt: '2024-01-01T00:00:00.000Z',
    dueDate: '2024-01-15T00:00:00.000Z',
    returnedAt: null,
    renewed: false,
    isOverdue: false,
    canRenew: true
  },
  {
    id: 'loan-2',
    bookId: 'book-2',
    memberId: 'member-2',
    borrowedAt: '2023-12-01T00:00:00.000Z',
    dueDate: '2023-12-15T00:00:00.000Z',
    returnedAt: null,
    renewed: false,
    isOverdue: true,
    canRenew: false
  },
  {
    id: 'loan-3',
    bookId: 'book-3',
    memberId: 'member-3',
    borrowedAt: '2023-11-01T00:00:00.000Z',
    dueDate: '2023-11-15T00:00:00.000Z',
    returnedAt: '2023-11-14T00:00:00.000Z',
    renewed: false,
    isOverdue: false,
    canRenew: false
  },
  {
    id: 'loan-4',
    bookId: 'book-4',
    memberId: 'member-1',
    borrowedAt: '2024-01-05T00:00:00.000Z',
    dueDate: '2024-01-19T00:00:00.000Z',
    returnedAt: null,
    renewed: true,
    isOverdue: false,
    canRenew: false
  }
];

export const mockLoansWithDetails: LoanWithDetails[] = [
  {
    id: 'loan-1',
    bookId: 'book-1',
    memberId: 'member-1',
    borrowedAt: '2024-01-01T00:00:00.000Z',
    dueDate: '2024-01-15T00:00:00.000Z',
    returnedAt: null,
    renewed: false,
    isOverdue: false,
    canRenew: true,
    book: {
      title: 'Test Book 1',
      author: 'Test Author 1'
    },
    member: {
      name: 'Test Member 1',
      email: 'test1@example.com'
    }
  },
  {
    id: 'loan-2',
    bookId: 'book-2',
    memberId: 'member-2',
    borrowedAt: '2023-12-01T00:00:00.000Z',
    dueDate: '2023-12-15T00:00:00.000Z',
    returnedAt: null,
    renewed: false,
    isOverdue: true,
    canRenew: false,
    book: {
      title: 'Test Book 2',
      author: 'Test Author 2'
    },
    member: {
      name: 'Test Member 2',
      email: 'test2@example.com'
    }
  }
];

export const mockCreateLoanRequest: CreateLoanRequest = {
  bookId: 'book-1',
  memberId: 'member-1'
};

export const mockActiveLoan: Loan = {
  id: 'loan-5',
  bookId: 'book-1',
  memberId: 'member-1',
  borrowedAt: '2024-01-10T00:00:00.000Z',
  dueDate: '2024-01-24T00:00:00.000Z',
  returnedAt: null,
  renewed: false,
  isOverdue: false,
  canRenew: true
};

export const mockReturnedLoan: Loan = {
  id: 'loan-6',
  bookId: 'book-2',
  memberId: 'member-2',
  borrowedAt: '2023-12-01T00:00:00.000Z',
  dueDate: '2023-12-15T00:00:00.000Z',
  returnedAt: '2023-12-14T00:00:00.000Z',
  renewed: false,
  isOverdue: false,
  canRenew: false
};

export const mockOverdueLoan: Loan = {
  id: 'loan-7',
  bookId: 'book-3',
  memberId: 'member-3',
  borrowedAt: '2023-12-01T00:00:00.000Z',
  dueDate: '2023-12-15T00:00:00.000Z',
  returnedAt: null,
  renewed: false,
  isOverdue: true,
  canRenew: false
};

export const mockRenewedLoan: Loan = {
  id: 'loan-8',
  bookId: 'book-4',
  memberId: 'member-1',
  borrowedAt: '2024-01-01T00:00:00.000Z',
  dueDate: '2024-01-15T00:00:00.000Z',
  returnedAt: null,
  renewed: true,
  isOverdue: false,
  canRenew: false
};

export const mockLoanDueToday: Loan = {
  id: 'loan-9',
  bookId: 'book-1',
  memberId: 'member-1',
  borrowedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  dueDate: new Date().toISOString(),
  returnedAt: null,
  renewed: false,
  isOverdue: false,
  canRenew: true
};

export const mockLoanDueTomorrow: Loan = {
  id: 'loan-10',
  bookId: 'book-2',
  memberId: 'member-2',
  borrowedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  returnedAt: null,
  renewed: false,
  isOverdue: false,
  canRenew: true
};
