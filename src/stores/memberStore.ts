import { writable, derived } from 'svelte/store';
import type { Member, FilterState } from '../types';

/**
 * Member Store - Svelte store for member state management
 * Acts as Model Observer - notifies Views when data changes
 */

interface MemberState {
  members: Member[];
  selectedMember: Member | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  filters: FilterState;
}

const initialState: MemberState = {
  members: [],
  selectedMember: null,
  loading: false,
  error: null,
  success: null,
  filters: {}
};

function createMemberStore() {
  const { subscribe, set, update } = writable<MemberState>(initialState);

  return {
    subscribe,

    // Set members
    setMembers: (members: Member[]) =>
      update(state => ({ ...state, members })),

    // Select a member
    selectMember: (member: Member | null) =>
      update(state => ({ ...state, selectedMember: member })),

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
        filters: { ...state.filters, ...filters }
      })),

    // Add a new member to the list
    addMember: (member: Member) =>
      update(state => ({
        ...state,
        members: [member, ...state.members]
      })),

    // Update a member in the list
    updateMember: (id: string, updatedMember: Member) =>
      update(state => ({
        ...state,
        members: state.members.map(m => m.id === id ? updatedMember : m),
        selectedMember: state.selectedMember?.id === id ? updatedMember : state.selectedMember
      })),

    // Remove a member from the list
    removeMember: (id: string) =>
      update(state => ({
        ...state,
        members: state.members.filter(m => m.id !== id),
        selectedMember: state.selectedMember?.id === id ? null : state.selectedMember
      })),

    // Reset to initial state
    reset: () => set(initialState)
  };
}

export const memberStore = createMemberStore();

// Derived store for active members only
export const activeMembers = derived(
  memberStore,
  $store => $store.members.filter(member => member.status === 'ACTIVE')
);

// Derived store for filtered members
export const filteredMembers = derived(
  memberStore,
  $store => {
    let result = $store.members;

    if ($store.filters.search) {
      const search = $store.filters.search.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search)
      );
    }

    if ($store.filters.status) {
      result = result.filter(m => m.status === $store.filters.status);
    }

    return result;
  }
);

// Derived store for loading state
export const isMemberLoading = derived(
  memberStore,
  $store => $store.loading
);

// Derived store for error state
export const hasMemberError = derived(
  memberStore,
  $store => $store.error !== null
);
