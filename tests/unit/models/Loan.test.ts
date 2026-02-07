import { describe, it, expect } from 'vitest';
import { LoanModel } from '@/models/Loan';
import { mockLoans, mockLoansWithDetails, mockActiveLoan, mockReturnedLoan, mockOverdueLoan, mockRenewedLoan, mockLoanDueToday, mockLoanDueTomorrow } from '../../mocks/loanData.mock';

/**
 * LoanModel Tests
 * 
 * Tests for LoanModel display logic methods
 * Follows backend pattern: pure unit tests, no external dependencies
 */
describe('LoanModel', () => {
  describe('constructor', () => {
    it('should create instance with valid loan data', () => {
      const loan = new LoanModel(mockLoans[0]);

      expect(loan.id).toBe('loan-1');
      expect(loan.bookId).toBe('book-1');
      expect(loan.memberId).toBe('member-1');
      expect(loan.borrowedAt).toBe('2024-01-01T00:00:00.000Z');
      expect(loan.dueDate).toBe('2024-01-15T00:00:00.000Z');
      expect(loan.returnedAt).toBeNull();
      expect(loan.renewed).toBe(false);
      expect(loan.isOverdue).toBe(false);
      expect(loan.canRenew).toBe(true);
    });

    it('should create instance with loan details', () => {
      const loan = new LoanModel(mockLoansWithDetails[0]);

      expect(loan.book).toEqual({
        title: 'Test Book 1',
        author: 'Test Author 1'
      });
      expect(loan.member).toEqual({
        name: 'Test Member 1',
        email: 'test1@example.com'
      });
    });

    it('should create instance with returnedAt date', () => {
      const loan = new LoanModel(mockLoans[2]);

      expect(loan.returnedAt).toBe('2023-11-14T00:00:00.000Z');
    });
  });

  describe('isActive', () => {
    it('should return true when returnedAt is null', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.isActive()).toBe(true);
    });

    it('should return false when returnedAt is not null', () => {
      const loan = new LoanModel(mockReturnedLoan);

      expect(loan.isActive()).toBe(false);
    });
  });

  describe('isReturned', () => {
    it('should return false when returnedAt is null', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.isReturned()).toBe(false);
    });

    it('should return true when returnedAt is not null', () => {
      const loan = new LoanModel(mockReturnedLoan);

      expect(loan.isReturned()).toBe(true);
    });
  });

  describe('getStatusColor', () => {
    it('should return green for active loan', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.getStatusColor()).toBe('#10b981');
    });

    it('should return red for overdue loan', () => {
      const loan = new LoanModel(mockOverdueLoan);

      expect(loan.getStatusColor()).toBe('#ef4444');
    });

    it('should return gray for returned loan', () => {
      const loan = new LoanModel(mockReturnedLoan);

      expect(loan.getStatusColor()).toBe('#6b7280');
    });
  });

  describe('getStatusDisplay', () => {
    it('should return active display text for active loan', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.getStatusDisplay()).toBe('○ Active');
    });

    it('should return overdue display text for overdue loan', () => {
      const loan = new LoanModel(mockOverdueLoan);

      expect(loan.getStatusDisplay()).toBe('⚠ Overdue');
    });

    it('should return returned display text for returned loan', () => {
      const loan = new LoanModel(mockReturnedLoan);

      expect(loan.getStatusDisplay()).toBe('✓ Returned');
    });
  });

  describe('getDisplayBorrowedDate', () => {
    it('should format borrowed date correctly', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.getDisplayBorrowedDate()).toBe('1/10/2024');
    });
  });

  describe('getDisplayDueDate', () => {
    it('should format due date correctly', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.getDisplayDueDate()).toBe('1/24/2024');
    });
  });

  describe('getDisplayReturnedDate', () => {
    it('should return Not returned when returnedAt is null', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.getDisplayReturnedDate()).toBe('Not returned');
    });

    it('should format returned date when exists', () => {
      const loan = new LoanModel(mockReturnedLoan);

      expect(loan.getDisplayReturnedDate()).toBe('12/14/2023');
    });
  });

  describe('getRenewalStatus', () => {
    it('should return Can renew for renewable active loan', () => {
      const loan = new LoanModel(mockActiveLoan);

      expect(loan.getRenewalStatus()).toBe('Can renew');
    });

    it('should return Already renewed for renewed loan', () => {
      const loan = new LoanModel(mockRenewedLoan);

      expect(loan.getRenewalStatus()).toBe('Already renewed');
    });

    it('should return Cannot renew for non-renewable loan', () => {
      const loan = new LoanModel(mockOverdueLoan);

      expect(loan.getRenewalStatus()).toBe('Cannot renew');
    });

    it('should return N/A for returned loan', () => {
      const loan = new LoanModel(mockReturnedLoan);

      expect(loan.getRenewalStatus()).toBe('N/A');
    });
  });

  describe('getBookTitle', () => {
    it('should return book title when details exist', () => {
      const loan = new LoanModel(mockLoansWithDetails[0]);

      expect(loan.getBookTitle()).toBe('Test Book 1');
    });

    it('should return Unknown book when details do not exist', () => {
      const loan = new LoanModel(mockLoans[0]);

      expect(loan.getBookTitle()).toBe('Unknown book');
    });
  });

  describe('getBookAuthor', () => {
    it('should return book author when details exist', () => {
      const loan = new LoanModel(mockLoansWithDetails[0]);

      expect(loan.getBookAuthor()).toBe('Test Author 1');
    });

    it('should return Unknown author when details do not exist', () => {
      const loan = new LoanModel(mockLoans[0]);

      expect(loan.getBookAuthor()).toBe('Unknown author');
    });
  });

  describe('getMemberName', () => {
    it('should return member name when details exist', () => {
      const loan = new LoanModel(mockLoansWithDetails[0]);

      expect(loan.getMemberName()).toBe('Test Member 1');
    });

    it('should return Unknown member when details do not exist', () => {
      const loan = new LoanModel(mockLoans[0]);

      expect(loan.getMemberName()).toBe('Unknown member');
    });
  });

  describe('getMemberEmail', () => {
    it('should return member email when details exist', () => {
      const loan = new LoanModel(mockLoansWithDetails[0]);

      expect(loan.getMemberEmail()).toBe('test1@example.com');
    });

    it('should return No email when details do not exist', () => {
      const loan = new LoanModel(mockLoans[0]);

      expect(loan.getMemberEmail()).toBe('No email');
    });
  });

  describe('toJSON', () => {
    it('should serialize to plain object', () => {
      const loan = new LoanModel(mockLoans[0]);
      const json = loan.toJSON();

      expect(json).toEqual(mockLoans[0]);
      expect(json).not.toBeInstanceOf(LoanModel);
    });

    it('should not include book and member details in JSON', () => {
      const loan = new LoanModel(mockLoansWithDetails[0]);
      const json = loan.toJSON();

      expect(json).not.toHaveProperty('book');
      expect(json).not.toHaveProperty('member');
    });
  });
});
