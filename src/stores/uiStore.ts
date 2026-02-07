import { writable, derived } from 'svelte/store';
import type { UIState } from '../types';

/**
 * UI Store - Svelte store for global UI state
 * Manages loading, errors, and success messages across the app
 */

interface UIStoreState extends UIState {
  currentPage: string;
  sidebarOpen: boolean;
}

const initialState: UIStoreState = {
  loading: false,
  error: null,
  success: null,
  currentPage: 'dashboard',
  sidebarOpen: true
};

function createUIStore() {
  const { subscribe, set, update } = writable<UIStoreState>(initialState);

  return {
    subscribe,

    // Set loading state
    setLoading: (loading: boolean) =>
      update(state => ({ ...state, loading })),

    // Set error message
    setError: (error: string | null) =>
      update(state => ({ ...state, error, success: null })),

    // Set success message
    setSuccess: (success: string | null) =>
      update(state => ({ ...state, success, error: null })),

    // Clear all messages
    clearMessages: () =>
      update(state => ({ ...state, error: null, success: null })),

    // Set current page
    setCurrentPage: (currentPage: string) =>
      update(state => ({ ...state, currentPage })),

    // Toggle sidebar
    toggleSidebar: () =>
      update(state => ({ ...state, sidebarOpen: !state.sidebarOpen })),

    // Set sidebar state
    setSidebarOpen: (sidebarOpen: boolean) =>
      update(state => ({ ...state, sidebarOpen })),

    // Reset to initial state
    reset: () => set(initialState)
  };
}

export const uiStore = createUIStore();

// Derived store for loading state
export const isLoading = derived(
  uiStore,
  $store => $store.loading
);

// Derived store for error state
export const hasError = derived(
  uiStore,
  $store => $store.error !== null
);

// Derived store for success state
export const hasSuccess = derived(
  uiStore,
  $store => $store.success !== null
);
