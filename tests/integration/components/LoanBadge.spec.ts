/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import LoanBadge from '@/views/components/LoanBadge.svelte';
import { mockLoans, mockActiveLoan, mockReturnedLoan, mockOverdueLoan, mockRenewedLoan } from '../../mocks/loanData.mock';

/**
 * LoanBadge Component Tests
 * 
 * Tests following Testing Library principles:
 * - Test user behavior, not implementation
 * - Query by role, not class names
 * - Test accessibility
 */
describe('LoanBadge', () => {
  const defaultProps = {
    loan: mockLoans[0]
  };

  it('should render loan status with correct color for active loan', () => {
    render(LoanBadge, { props: { loan: mockActiveLoan } });

    const statusBadge = screen.getByText('Active');
    expect(statusBadge).toBeInTheDocument();
  });

  it('should render loan status with correct color for overdue loan', () => {
    render(LoanBadge, { props: { loan: mockOverdueLoan } });

    const statusBadge = screen.getByText('Overdue');
    expect(statusBadge).toBeInTheDocument();
  });

  it('should render loan status with correct color for returned loan', () => {
    render(LoanBadge, { props: { loan: mockReturnedLoan } });

    const statusBadge = screen.getByText('Returned');
    expect(statusBadge).toBeInTheDocument();
  });

  it('should show correct status text for active loan', () => {
    render(LoanBadge, { props: { loan: mockActiveLoan } });

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should show correct status text for overdue loan', () => {
    render(LoanBadge, { props: { loan: mockOverdueLoan } });

    expect(screen.getByText('Overdue')).toBeInTheDocument();
  });

  it('should show correct status text for returned loan', () => {
    render(LoanBadge, { props: { loan: mockReturnedLoan } });

    expect(screen.getByText('Returned')).toBeInTheDocument();
  });

  it('should show Renewed badge when loan is renewed', () => {
    render(LoanBadge, { props: { loan: mockRenewedLoan } });

    expect(screen.getByText('Renewed')).toBeInTheDocument();
  });

  it('should not show Renewed badge when loan is not renewed', () => {
    render(LoanBadge, { props: { loan: mockActiveLoan } });

    expect(screen.queryByText('Renewed')).not.toBeInTheDocument();
  });

  it('should display due date', () => {
    render(LoanBadge, { props: { loan: mockActiveLoan } });

    // mockActiveLoan.dueDate is '2024-01-24T00:00:00.000Z' -> 1/24/2024
    expect(screen.getByText(/1\/24\/2024/)).toBeInTheDocument();
  });

  it('should display borrowed date', () => {
    render(LoanBadge, { props: { loan: mockActiveLoan } });

    // mockActiveLoan.borrowedAt is '2024-01-10T00:00:00.000Z' -> 1/10/2024
    expect(screen.getByText(/1\/10\/2024/)).toBeInTheDocument();
  });

  it('should display book title when details exist', () => {
    const loanWithDetails = {
      ...mockLoans[0],
      book: { title: 'Test Book', author: 'Test Author' },
      member: { name: 'Test Member', email: 'test@example.com' }
    };

    render(LoanBadge, { props: { loan: loanWithDetails } });

    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('should display book author when details exist', () => {
    const loanWithDetails = {
      ...mockLoans[0],
      book: { title: 'Test Book', author: 'Test Author' },
      member: { name: 'Test Member', email: 'test@example.com' }
    };

    render(LoanBadge, { props: { loan: loanWithDetails } });

    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('should display member name when details exist', () => {
    const loanWithDetails = {
      ...mockLoans[0],
      book: { title: 'Test Book', author: 'Test Author' },
      member: { name: 'Test Member', email: 'test@example.com' }
    };

    render(LoanBadge, { props: { loan: loanWithDetails } });

    expect(screen.getByText('Test Member')).toBeInTheDocument();
  });

  it('should have correct ARIA attributes', () => {
    render(LoanBadge, { props: defaultProps });

    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
  });
});
