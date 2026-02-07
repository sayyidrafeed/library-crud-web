import { apiClient } from './apiClient';
import type {
  Member,
  CreateMemberRequest,
  UpdateMemberRequest
} from '../types';

/**
 * Member Service - Pure API functions for member operations
 * No business logic - only HTTP requests
 */
export const memberService = {
  /**
   * Get all members
   */
  async getAll(): Promise<Member[]> {
    return apiClient.get<Member[]>('/members');
  },

  /**
   * Get member by ID
   */
  async getById(id: string): Promise<Member> {
    return apiClient.get<Member>(`/members/${id}`);
  },

  /**
   * Create a new member
   */
  async create(data: CreateMemberRequest): Promise<Member> {
    return apiClient.post<Member>('/members', data);
  },

  /**
   * Update an existing member
   */
  async update(id: string, data: UpdateMemberRequest): Promise<Member> {
    return apiClient.patch<Member>(`/members/${id}`, data);
  },

  /**
   * Delete a member
   */
  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/members/${id}`);
  },

  /**
   * Suspend a member
   */
  async suspend(id: string): Promise<Member> {
    return apiClient.post<Member>(`/members/${id}/suspend`, {});
  },

  /**
   * Activate a member
   */
  async activate(id: string): Promise<Member> {
    return apiClient.post<Member>(`/members/${id}/activate`, {});
  }
};
