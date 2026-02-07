import { apiClient } from './apiClient';
import type {
  DashboardStats,
  RecentActivity
} from '../types';

/**
 * Dashboard Service - Pure API functions for dashboard operations
 * No business logic - only HTTP requests
 */
export const dashboardService = {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>('/dashboard/stats');
  },

  /**
   * Get recent activity
   */
  async getRecentActivity(): Promise<RecentActivity[]> {
    return apiClient.get<RecentActivity[]>('/dashboard/activity');
  }
};
