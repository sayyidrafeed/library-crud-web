// Book Types
export type BookStatus = 'AVAILABLE' | 'BORROWED' | 'RESERVED';

export interface Book {
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
}

export interface BookListResponse {
  books: Book[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateBookRequest {
  isbn: string;
  title: string;
  author: string;
  description?: string;
  genre: string;
  publishedYear?: number;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  description?: string;
  genre?: string;
  publishedYear?: number;
}

// Member Types
export type MemberStatus = 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';

export interface Member {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  address: string | null;
  status: MemberStatus;
  currentLoans: number;
  remainingCapacity: number;
  createdAt: string;
}

export interface CreateMemberRequest {
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface UpdateMemberRequest {
  name?: string;
  phone?: string;
  address?: string;
}

// Loan Types
export interface Loan {
  id: string;
  bookId: string;
  memberId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt: string | null;
  renewed: boolean;
  isOverdue: boolean;
  canRenew: boolean;
}

export interface LoanWithDetails extends Loan {
  book: {
    title: string;
    author: string;
  };
  member: {
    name: string;
    email: string;
  };
}

export interface CreateLoanRequest {
  bookId: string;
  memberId: string;
}

// Dashboard Types
export interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  activeMembers: number;
  totalLoans: number;
  activeLoans: number;
  overdueLoans: number;
}

export interface RecentActivity {
  id: string;
  type: 'borrow' | 'return' | 'renew';
  bookTitle: string;
  memberName: string;
  timestamp: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// UI State Types
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface FilterState {
  genre?: string;
  status?: string;
  search?: string;
}

export interface UIState {
  loading: boolean;
  error: string | null;
  success: string | null;
}
