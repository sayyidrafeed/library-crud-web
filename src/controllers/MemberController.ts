import { memberStore } from '../stores/memberStore';
import { uiStore } from '../stores/uiStore';
import { memberService } from '../services/memberService';
import type { CreateMemberRequest, UpdateMemberRequest } from '../types';

/**
 * Member Controller - Coordinates between user actions, services, and stores
 * No business rules - only input validation and coordination
 */
export class MemberController {
  private store = memberStore;
  private uiStore = uiStore;
  private service = memberService;

  /**
   * Load all members
   */
  async loadMembers() {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const members = await this.service.getAll();
      this.store.setMembers(members);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load members';
      this.store.setError(message);
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Load a single member by ID
   */
  async loadMember(id: string) {
    this.uiStore.setLoading(true);
    this.uiStore.setError(null);

    try {
      const member = await this.service.getById(id);
      this.store.selectMember(member);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load member';
      this.uiStore.setError(message);
    } finally {
      this.uiStore.setLoading(false);
    }
  }

  /**
   * Create a new member
   * Input validation only - business rules in backend
   */
  async createMember(data: CreateMemberRequest) {
    // Format validation (not business logic)
    if (!data.email || !data.name) {
      throw new Error('Email and name are required');
    }

    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const member = await this.service.create(data);
      this.store.addMember(member);
      this.uiStore.setSuccess('Member created successfully');
      return member;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create member';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Update an existing member
   */
  async updateMember(id: string, data: UpdateMemberRequest) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const member = await this.service.update(id, data);
      this.store.updateMember(id, member);
      this.uiStore.setSuccess('Member updated successfully');
      return member;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update member';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Delete a member
   */
  async deleteMember(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      await this.service.delete(id);
      this.store.removeMember(id);
      this.uiStore.setSuccess('Member deleted successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete member';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Suspend a member
   */
  async suspendMember(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const member = await this.service.suspend(id);
      this.store.updateMember(id, member);
      this.uiStore.setSuccess('Member suspended successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to suspend member';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Activate a member
   */
  async activateMember(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const member = await this.service.activate(id);
      this.store.updateMember(id, member);
      this.uiStore.setSuccess('Member activated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to activate member';
      this.store.setError(message);
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  /**
   * Select a member
   */
  selectMember(member: any) {
    this.store.selectMember(member);
  }

  /**
   * Set filter
   */
  setFilter(key: string, value: string | undefined) {
    this.store.setFilters({ [key]: value });
  }

  /**
   * Reset controller state
   */
  reset() {
    this.store.reset();
  }
}

// Export singleton instance
export const memberController = new MemberController();
