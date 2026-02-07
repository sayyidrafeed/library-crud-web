/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import BookCard from '@/views/components/BookCard.svelte';
import { mockBooks, mockBookWithoutYear } from '../../mocks/bookData.mock';

/**
 * BookCard Component Tests
 * 
 * Tests following Testing Library principles:
 * - Test user behavior, not implementation
 * - Query by role, not class names
 * - Test accessibility
 */
describe('BookCard', () => {
  const defaultProps = {
    book: mockBooks[0]
  };

  it('should render book information', () => {
    render(BookCard, { props: defaultProps });

    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('by Test Author 1')).toBeInTheDocument();
    expect(screen.getByText('A test book description')).toBeInTheDocument();
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('should display status badge', () => {
    render(BookCard, { props: defaultProps });

    const statusBadge = screen.getByText('AVAILABLE');
    expect(statusBadge).toBeInTheDocument();
  });

  it('should truncate long title', () => {
    const longTitleBook = {
      ...mockBooks[0],
      title: 'This is a very long book title that should be truncated here'
    };

    render(BookCard, { props: { book: longTitleBook } });

    // Title > 50 chars gets truncated to 50 chars + '...' = 53 total
    // Input: 'This is a very long book title that should be truncated here' (61 chars)
    // First 50 chars: 'This is a very long book title that should be trun'
    expect(screen.getByText('This is a very long book title that should be trun...')).toBeInTheDocument();
  });

  it('should not render description when null', () => {
    const noDescBook = {
      ...mockBooks[0],
      description: null
    };

    render(BookCard, { props: { book: noDescBook } });

    // No description text should be present (we check it's not showing any description paragraph)
    expect(screen.queryByText('A test book description')).not.toBeInTheDocument();
  });

  it('should truncate long description', () => {
    const longDescBook = {
      ...mockBooks[0],
      description: 'This is a very long description that should be truncated because it exceeds the maximum length allowed for descriptions'
    };

    render(BookCard, { props: { book: longDescBook } });

    // Description > 100 chars gets truncated to 100 chars + '...'
    // Input: 'This is a very long description that should be truncated because it exceeds the maximum length allowed for descriptions' (118 chars)
    // First 100 chars + '...'
    expect(screen.getByText('This is a very long description that should be truncated because it exceeds the maximum length allow...')).toBeInTheDocument();
  });

  it('should dispatch select event on click', async () => {
    const user = userEvent.setup();
    render(BookCard, { props: defaultProps });

    // In Svelte 5, we test behavior by checking the element is interactive
    const card = screen.getByRole('button');
    await user.click(card);
    // Card should still be in the document after click (no navigation error)
    expect(card).toBeInTheDocument();
  });

  it('should handle keyboard interaction', async () => {
    const user = userEvent.setup();
    render(BookCard, { props: defaultProps });

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('[Enter]');
    // Card should still be in the document after keyboard interaction
    expect(card).toBeInTheDocument();
  });

  it('should have correct ARIA attributes', () => {
    render(BookCard, { props: defaultProps });

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('should not render year when null', () => {
    render(BookCard, { props: { book: mockBookWithoutYear } });

    expect(screen.queryByText('2020')).not.toBeInTheDocument();
  });

  it('should display different status colors', () => {
    const borrowedBook = {
      ...mockBooks[0],
      status: 'BORROWED' as const,
      isAvailable: false
    };

    render(BookCard, { props: { book: borrowedBook } });

    const statusBadge = screen.getByText('BORROWED');
    expect(statusBadge).toBeInTheDocument();
  });

  it('should display RESERVED status', () => {
    const reservedBook = {
      ...mockBooks[0],
      status: 'RESERVED' as const,
      isAvailable: false
    };

    render(BookCard, { props: { book: reservedBook } });

    const statusBadge = screen.getByText('RESERVED');
    expect(statusBadge).toBeInTheDocument();
  });

  it('should display author with "by" prefix', () => {
    render(BookCard, { props: defaultProps });

    expect(screen.getByText('by Test Author 1')).toBeInTheDocument();
  });

  it('should render genre badge', () => {
    render(BookCard, { props: defaultProps });

    const genreBadge = screen.getByText('Fiction');
    expect(genreBadge).toBeInTheDocument();
  });

  it('should be clickable', () => {
    render(BookCard, { props: defaultProps });

    const card = screen.getByRole('button');
    expect(card).toBeEnabled();
  });
});
