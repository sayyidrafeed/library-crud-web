import { apiClient } from './apiClient';
import type {
  Loan,
  LoanWithDetails,
  CreateLoanRequest
} from '../types';

/**
 * Loan Service - Pure API functions for loan operations
 * No business logic - only HTTP requests
 */
export const loanService = {
  /**
   * Get all loans
   */
  async getAll(): Promise<Loan[]> {
    return apiClient.get<Loan[]>('/loans');
  },

  /**
   * Get loan by ID
   */
  async getById(id: string): Promise<Loan> {
    return apiClient.get<Loan>(`/loans/${id}`);
  },

  /**
   * Borrow a book
   */
  async borrow(data: CreateLoanRequest): Promise<Loan> {
    return apiClient.post<Loan>('/loans/borrow', data);
  },

  /**
   * Return a book
   */
  async returnBook(id: string): Promise<Loan> {
    return apiClient.post<Loan>(`/loans/${id}/return`, {});
  },

  /**
   * Renew a loan
   */
  async renew(id: string): Promise<Loan> {
    return apiClient.post<Loan>(`/loans/${id}/renew`, {});
  },

  /**
   * Get loans for a specific member
   */
  async getByMember(memberId: string, status?: string): Promise<LoanWithDetails[]> {
    const params = status ? `?status=${status}` : '';
    return apiClient.get<LoanWithDetails[]>(`/loans/member/${memberId}${params}`);
  },

  /**
   * Get overdue loans
   */
  async getOverdue(): Promise<LoanWithDetails[]> {
    return apiClient.get<LoanWithDetails[]>('/loans/overdue');
  }
};
