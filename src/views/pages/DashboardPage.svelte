<script lang="ts">
  import { onMount } from 'svelte';
  import { dashboardController } from '../../controllers/DashboardController';
  import { isLoading, hasError } from '../../stores/uiStore';
  import type { DashboardStats, RecentActivity } from '../../types';

  let stats: DashboardStats | null = null;
  let recentActivity: RecentActivity[] = [];

  onMount(async () => {
    const data = await dashboardController.loadDashboardData();
    stats = data.stats;
    recentActivity = data.activity;
  });

  function getActivityIcon(type: string): string {
    switch (type) {
      case 'borrow':
        return '📚';
      case 'return':
        return '↩';
      case 'renew':
        return '↻';
      default:
        return '📋';
    }
  }

  function getActivityColor(type: string): string {
    switch (type) {
      case 'borrow':
        return '#dbeafe';
      case 'return':
        return '#d1fae5';
      case 'renew':
        return '#fef3c7';
      default:
        return '#e5e7eb';
    }
  }
</script>

<div class="dashboard-page">
  <h1>Dashboard</h1>
  
  {#if $isLoading}
    <div class="loading">Loading dashboard...</div>
  {:else if $hasError}
    <div class="error">Failed to load dashboard</div>
  {:else if stats}
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-info">
          <div class="stat-value">{stats.totalBooks}</div>
          <div class="stat-label">Total Books</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">✓</div>
        <div class="stat-info">
          <div class="stat-value">{stats.availableBooks}</div>
          <div class="stat-label">Available</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📖</div>
        <div class="stat-info">
          <div class="stat-value">{stats.borrowedBooks}</div>
          <div class="stat-label">Borrowed</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
          <div class="stat-value">{stats.totalMembers}</div>
          <div class="stat-label">Total Members</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">✓</div>
        <div class="stat-info">
          <div class="stat-value">{stats.activeMembers}</div>
          <div class="stat-label">Active Members</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-info">
          <div class="stat-value">{stats.totalLoans}</div>
          <div class="stat-label">Total Loans</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">○</div>
        <div class="stat-info">
          <div class="stat-value">{stats.activeLoans}</div>
          <div class="stat-label">Active Loans</div>
        </div>
      </div>
      
      <div class="stat-card warning">
        <div class="stat-icon">⚠</div>
        <div class="stat-info">
          <div class="stat-value">{stats.overdueLoans}</div>
          <div class="stat-label">Overdue</div>
        </div>
      </div>
    </div>
    
    <div class="recent-activity">
      <h2>Recent Activity</h2>
      {#if recentActivity.length === 0}
        <div class="empty">No recent activity</div>
      {:else}
        <div class="activity-list">
          {#each recentActivity as activity (activity.id)}
            <div class="activity-item">
              <div 
                class="activity-icon"
                style="background-color: {getActivityColor(activity.type)}"
              >
                {getActivityIcon(activity.type)}
              </div>
              <div class="activity-details">
                <div class="activity-title">
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}: 
                  <strong>{activity.bookTitle}</strong>
                </div>
                <div class="activity-member">by {activity.memberName}</div>
                <div class="activity-time">
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .dashboard-page {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  h1 {
    margin: 0 0 2rem 0;
    color: #1f2937;
    font-size: 2rem;
    font-weight: 700;
  }
  
  .loading, .error, .empty {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
    font-size: 1.1rem;
    border-radius: 8px;
    background: #f9fafb;
  }
  
  .error {
    color: #dc2626;
    background: #fef2f2;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .stat-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
  }
  
  .stat-card.warning {
    border-color: #fcd34d;
    background: #fffbeb;
  }
  
  .stat-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    border-radius: 12px;
  }
  
  .stat-info {
    flex: 1;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    line-height: 1;
  }
  
  .stat-label {
    color: #6b7280;
    font-size: 0.9rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .recent-activity {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
  }
  
  .recent-activity h2 {
    margin: 0 0 1.5rem 0;
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .activity-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
  }
  
  .activity-icon {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    flex-shrink: 0;
  }
  
  .activity-details {
    flex: 1;
  }
  
  .activity-title {
    color: #1f2937;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  
  .activity-member {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
  
  .activity-time {
    color: #9ca3af;
    font-size: 0.85rem;
  }
</style>
