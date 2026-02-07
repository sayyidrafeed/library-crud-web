<script lang="ts">
  import type { Loan } from '../../types';

  export let loan: Loan & {
    book?: { title: string; author: string };
    member?: { name: string; email: string };
  };

  function getStatusColor(isReturned: boolean, isOverdue: boolean): string {
    if (isReturned) return '#6b7280';
    if (isOverdue) return '#ef4444';
    return '#10b981';
  }

  function getStatusText(isReturned: boolean, isOverdue: boolean): string {
    if (isReturned) return 'Returned';
    if (isOverdue) return 'Overdue';
    return 'Active';
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US');
  }

  function getDueDateStatus(dueDate: string, isReturned: boolean, isOverdue: boolean): string {
    if (isReturned) return 'Returned';
    if (isOverdue) {
      const due = new Date(dueDate);
      const now = new Date();
      const diffTime = now.getTime() - due.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${days} days overdue`;
    }
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  }
</script>

<div class="loan-badge" role="status">
  <div class="loan-status" style="background-color: {getStatusColor(loan.returnedAt !== null, loan.isOverdue)}">
    <span class="status-text">{getStatusText(loan.returnedAt !== null, loan.isOverdue)}</span>
  </div>
  
  <div class="loan-dates">
    <span class="date-item">Borrowed: {formatDate(loan.borrowedAt)}</span>
    <span class="date-item">Due: {formatDate(loan.dueDate)}</span>
  </div>
  
  <div class="loan-details">
    <span class="due-status">📅 {getDueDateStatus(loan.dueDate, loan.returnedAt !== null, loan.isOverdue)}</span>
    {#if loan.renewed}
      <span class="renewed">Renewed</span>
    {/if}
  </div>
  
  {#if loan.book}
    <div class="book-info">
      <span class="book-title">{loan.book.title}</span>
      <span class="book-author">{loan.book.author}</span>
    </div>
  {/if}
  
  {#if loan.member}
    <div class="member-info">
      <span class="member-name">{loan.member.name}</span>
    </div>
  {/if}
</div>

<style>
  .loan-badge {
    display: inline-flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 0.85rem;
  }
  
  .loan-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    color: white;
    font-weight: 600;
  }
  
  .status-text {
    text-transform: capitalize;
  }
  
  .loan-dates {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    color: #374151;
    font-size: 0.8rem;
  }
  
  .date-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .loan-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #6b7280;
  }
  
  .due-status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .renewed {
    background: #fef3c7;
    color: #d97706;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .book-info, .member-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .book-title, .member-name {
    font-weight: 500;
    color: #1f2937;
  }
  
  .book-author {
    color: #6b7280;
    font-size: 0.8rem;
  }
</style>
