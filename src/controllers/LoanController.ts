import { bookStore } from '../stores/bookStore';
import { uiStore } from '../stores/uiStore';
import { loanService } from '../services/loanService';

/**
 * Loan Controller - Coordinates between user actions, services, and stores
 * No business rules - only input validation and coordination
 */
export class LoanController {
  private bookStore = bookStore;
  private uiStore = uiStore;
  private service = loanService;

  /**
   * Load all loans
   */
  async loadLoans() {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const loans = await this.service.getAll();
      return loans;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load loans';
      this.uiStore.setError(message);
      return [];
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Load loans for a specific member
   */
  async loadMemberLoans(memberId: string, status?: string) {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const loans = await this.service.getByMember(memberId, status);
      return loans;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load member loans';
      this.uiStore.setError(message);
      return [];
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Load overdue loans
   */
  async loadOverdueLoans() {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const loans = await this.service.getOverdue();
      return loans;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load overdue loans';
      this.uiStore.setError(message);
      return [];
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Borrow a book
   * Input validation only - business rules in backend
   */
  async borrowBook(bookId: string, memberId: string) {
    // Format validation (not business logic)
    if (!bookId || !memberId) {
      throw new Error('Book ID and Member ID are required');
    }

    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const loan = await this.service.borrow({ bookId, memberId });
      
      // Update book status in store
      const books = this.getBooks();
      const book = books.find(b => b.id === bookId);
      if (book) {
        this.bookStore.updateBook(bookId, {
          ...book,
          status: 'BORROWED',
          isAvailable: false
        });
      }

      this.uiStore.setSuccess('Book borrowed successfully');
      return loan;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to borrow book';
      this.uiStore.setError(message);
      throw error;
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Return a book
   */
  async returnBook(loanId: string, bookId: string) {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const loan = await this.service.returnBook(loanId);
      
      // Update book status in store
      const books = this.getBooks();
      const book = books.find(b => b.id === bookId);
      if (book) {
        this.bookStore.updateBook(bookId, {
          ...book,
          status: 'AVAILABLE',
          isAvailable: true
        });
      }

      this.uiStore.setSuccess('Book returned successfully');
      return loan;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to return book';
      this.uiStore.setError(message);
      throw error;
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Renew a loan
   */
  async renewLoan(loanId: string) {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const loan = await this.service.renew(loanId);
      this.uiStore.setSuccess('Loan renewed successfully');
      return loan;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to renew loan';
      this.uiStore.setError(message);
      throw error;
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Helper to get books from store
   */
  private getBooks() {
    let books: any[] = [];
    const unsubscribe = this.bookStore.subscribe(state => {
      books = state.books;
    });
    unsubscribe();
    return books;
  }

  /**
   * Reset controller state
   */
  reset() {
    // Controllers don't own state, so nothing to reset
  }
}

// Export singleton instance
export const loanController = new LoanController();
