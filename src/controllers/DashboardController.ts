import { uiStore } from '../stores/uiStore';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats, RecentActivity } from '../types';

/**
 * Dashboard Controller - Coordinates between user actions, services, and stores
 * No business rules - only input validation and coordination
 */
export class DashboardController {
  private uiStore = uiStore;
  private service = dashboardService;

  /**
   * Load dashboard statistics
   */
  async loadStats(): Promise<DashboardStats | null> {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const stats = await this.service.getStats();
      return stats;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load dashboard stats';
      this.uiStore.setError(message);
      return null;
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Load recent activity
   */
  async loadRecentActivity(): Promise<RecentActivity[]> {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const activity = await this.service.getRecentActivity();
      return activity;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load recent activity';
      this.uiStore.setError(message);
      return [];
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Load all dashboard data
   */
  async loadDashboardData(): Promise<{
    stats: DashboardStats | null;
    activity: RecentActivity[];
  }> {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const [stats, activity] = await Promise.all([
        this.service.getStats(),
        this.service.getRecentActivity()
      ]);

      return { stats, activity };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load dashboard data';
      this.uiStore.setError(message);
      return { stats: null, activity: [] };
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Reset controller state
   */
  reset() {
    // Controllers don't own state, so nothing to reset
  }
}

// Export singleton instance
export const dashboardController = new DashboardController();
