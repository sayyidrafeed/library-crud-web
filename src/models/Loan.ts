import type { Loan, LoanWithDetails } from '../types';

/**
 * Loan Model - Client-side model with display logic
 * Contains no API calls or View imports
 * Only business logic for UI display and formatting
 */
export class LoanModel {
  id: string;
  bookId: string;
  memberId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt: string | null;
  renewed: boolean;
  isOverdue: boolean;
  canRenew: boolean;
  book?: {
    title: string;
    author: string;
  };
  member?: {
    name: string;
    email: string;
  };

  constructor(data: Loan | LoanWithDetails) {
    this.id = data.id;
    this.bookId = data.bookId;
    this.memberId = data.memberId;
    this.borrowedAt = data.borrowedAt;
    this.dueDate = data.dueDate;
    this.returnedAt = data.returnedAt;
    this.renewed = data.renewed;
    this.isOverdue = data.isOverdue;
    this.canRenew = data.canRenew;

    if ('book' in data) {
      this.book = data.book;
    }
    if ('member' in data) {
      this.member = data.member;
    }
  }

  /**
   * Check if loan is currently active
   * Display logic only
   */
  isActive(): boolean {
    return this.returnedAt === null;
  }

  /**
   * Check if loan has been returned
   * Display logic only
   */
  isReturned(): boolean {
    return this.returnedAt !== null;
  }

  /**
   * Get status color for UI display
   * UI formatting logic
   */
  getStatusColor(): string {
    if (this.isReturned()) {
      return '#6b7280';
    }
    if (this.isOverdue) {
      return '#ef4444';
    }
    return '#10b981';
  }

  /**
   * Get status text with icon
   * UI formatting logic
   */
  getStatusDisplay(): string {
    if (this.isReturned()) {
      return '✓ Returned';
    }
    if (this.isOverdue) {
      return '⚠ Overdue';
    }
    return '○ Active';
  }

  /**
   * Get formatted borrowed date
   * UI formatting logic
   */
  getDisplayBorrowedDate(): string {
    return new Date(this.borrowedAt).toLocaleDateString('en-US');
  }

  /**
   * Get formatted due date
   * UI formatting logic
   */
  getDisplayDueDate(): string {
    return new Date(this.dueDate).toLocaleDateString('en-US');
  }

  /**
   * Get formatted returned date
   * UI formatting logic
   */
  getDisplayReturnedDate(): string {
    return this.returnedAt ? new Date(this.returnedAt).toLocaleDateString('en-US') : 'Not returned';
  }

  /**
   * Get days until due date
   * UI formatting logic
   */
  getDaysUntilDue(): number {
    const due = new Date(this.dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Get days overdue
   * UI formatting logic
   */
  getDaysOverdue(): number {
    if (!this.isOverdue) return 0;
    const due = new Date(this.dueDate);
    const now = new Date();
    const diffTime = now.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Get due date status text
   * UI formatting logic
   */
  getDueDateStatus(): string {
    if (this.isReturned()) {
      return 'Returned';
    }
    if (this.isOverdue) {
      return `${this.getDaysOverdue()} days overdue`;
    }
    const days = this.getDaysUntilDue();
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  }

  /**
   * Get renewal status text
   * UI formatting logic
   */
  getRenewalStatus(): string {
    if (this.isReturned()) return 'N/A';
    if (this.renewed) return 'Already renewed';
    if (this.canRenew) return 'Can renew';
    return 'Cannot renew';
  }

  /**
   * Get book title
   * UI formatting logic
   */
  getBookTitle(): string {
    return this.book?.title || 'Unknown book';
  }

  /**
   * Get book author
   * UI formatting logic
   */
  getBookAuthor(): string {
    return this.book?.author || 'Unknown author';
  }

  /**
   * Get member name
   * UI formatting logic
   */
  getMemberName(): string {
    return this.member?.name || 'Unknown member';
  }

  /**
   * Get member email
   * UI formatting logic
   */
  getMemberEmail(): string {
    return this.member?.email || 'No email';
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): Loan {
    return {
      id: this.id,
      bookId: this.bookId,
      memberId: this.memberId,
      borrowedAt: this.borrowedAt,
      dueDate: this.dueDate,
      returnedAt: this.returnedAt,
      renewed: this.renewed,
      isOverdue: this.isOverdue,
      canRenew: this.canRenew
    };
  }
}
