import { writable, derived } from 'svelte/store';
import type { Book, FilterState, PaginationState } from '../types';

/**
 * Book Store - Svelte store for book state management
 * Acts as Model Observer - notifies Views when data changes
 */

interface BookState {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  filters: FilterState;
  pagination: PaginationState;
}

const initialState: BookState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
  success: null,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 20,
    total: 0
  }
};

function createBookStore() {
  const { subscribe, set, update } = writable<BookState>(initialState);

  return {
    subscribe,

    // Set books with pagination info
    setBooks: (books: Book[], total: number) =>
      update(state => ({
        ...state,
        books,
        pagination: { ...state.pagination, total }
      })),

    // Select a book
    selectBook: (book: Book | null) =>
      update(state => ({ ...state, selectedBook: book })),

    // Set loading state
    setLoading: (loading: boolean) =>
      update(state => ({ ...state, loading })),

    // Set error message
    setError: (error: string | null) =>
      update(state => ({ ...state, error, success: null })),

    // Set success message
    setSuccess: (success: string | null) =>
      update(state => ({ ...state, success, error: null })),

    // Set filters
    setFilters: (filters: Partial<FilterState>) =>
      update(state => ({
        ...state,
        filters: { ...state.filters, ...filters },
        pagination: { ...state.pagination, page: 1 } // Reset to page 1
      })),

    // Set page
    setPage: (page: number) =>
      update(state => ({
        ...state,
        pagination: { ...state.pagination, page }
      })),

    // Set page size
    setPageSize: (pageSize: number) =>
      update(state => ({
        ...state,
        pagination: { ...state.pagination, pageSize, page: 1 }
      })),

    // Add a new book to the list
    addBook: (book: Book) =>
      update(state => ({
        ...state,
        books: [book, ...state.books],
        pagination: { ...state.pagination, total: state.pagination.total + 1 }
      })),

    // Update a book in the list
    updateBook: (id: string, updatedBook: Book) =>
      update(state => ({
        ...state,
        books: state.books.map(b => b.id === id ? updatedBook : b),
        selectedBook: state.selectedBook?.id === id ? updatedBook : state.selectedBook
      })),

    // Remove a book from the list
    removeBook: (id: string) =>
      update(state => ({
        ...state,
        books: state.books.filter(b => b.id !== id),
        selectedBook: state.selectedBook?.id === id ? null : state.selectedBook,
        pagination: { ...state.pagination, total: state.pagination.total - 1 }
      })),

    // Reset to initial state
    reset: () => set(initialState)
  };
}

export const bookStore = createBookStore();

// Derived store for available books only
export const availableBooks = derived(
  bookStore,
  $store => $store.books.filter(book => book.isAvailable)
);

// Derived store for filtered books
export const filteredBooks = derived(
  bookStore,
  $store => {
    let result = $store.books;

    if ($store.filters.genre) {
      result = result.filter(b => b.genre === $store.filters.genre);
    }

    if ($store.filters.status) {
      result = result.filter(b => b.status === $store.filters.status);
    }

    if ($store.filters.search) {
      const search = $store.filters.search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(search) ||
        b.author.toLowerCase().includes(search)
      );
    }

    return result;
  }
);

// Derived store for loading state
export const isLoading = derived(
  bookStore,
  $store => $store.loading
);

// Derived store for error state
export const hasError = derived(
  bookStore,
  $store => $store.error !== null
);
