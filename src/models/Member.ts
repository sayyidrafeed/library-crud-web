import type { Member, MemberStatus } from '../types';

/**
 * Member Model - Client-side model with display logic
 * Contains no API calls or View imports
 * Only business logic for UI display and formatting
 */
export class MemberModel {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  address: string | null;
  status: MemberStatus;
  currentLoans: number;
  remainingCapacity: number;
  createdAt: string;

  constructor(data: Member) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.phone = data.phone;
    this.address = data.address;
    this.status = data.status;
    this.currentLoans = data.currentLoans;
    this.remainingCapacity = data.remainingCapacity;
    this.createdAt = data.createdAt;
  }

  /**
   * Check if member is active
   * Display logic only - business validation is on backend
   */
  isActive(): boolean {
    return this.status === 'ACTIVE';
  }

  /**
   * Check if member is suspended
   * Display logic only
   */
  isSuspended(): boolean {
    return this.status === 'SUSPENDED';
  }

  /**
   * Check if member is inactive
   * Display logic only
   */
  isInactive(): boolean {
    return this.status === 'INACTIVE';
  }

  /**
   * Get status color for UI display
   * UI formatting logic
   */
  getStatusColor(): string {
    switch (this.status) {
      case 'ACTIVE':
        return '#10b981';
      case 'SUSPENDED':
        return '#ef4444';
      case 'INACTIVE':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  }

  /**
   * Get status text with icon
   * UI formatting logic
   */
  getStatusDisplay(): string {
    switch (this.status) {
      case 'ACTIVE':
        return '✓ Active';
      case 'SUSPENDED':
        return '⚠ Suspended';
      case 'INACTIVE':
        return '○ Inactive';
      default:
        return this.status;
    }
  }

  /**
   * Get display name with truncation if too long
   * UI formatting logic
   */
  getDisplayName(maxLength: number = 30): string {
    if (this.name.length <= maxLength) {
      return this.name;
    }
    return this.name.substring(0, maxLength - 3) + '...';
  }

  /**
   * Get formatted phone number
   * UI formatting logic
   */
  getDisplayPhone(): string {
    return this.phone || 'No phone number';
  }

  /**
   * Get formatted address with truncation
   * UI formatting logic
   */
  getDisplayAddress(maxLength: number = 50): string {
    if (!this.address) {
      return 'No address';
    }
    if (this.address.length <= maxLength) {
      return this.address;
    }
    return this.address.substring(0, maxLength - 3) + '...';
  }

  /**
   * Get loan capacity progress percentage
   * UI formatting logic
   */
  getLoanCapacityPercentage(): number {
    const maxLoans = this.currentLoans + this.remainingCapacity;
    return maxLoans > 0 ? Math.round((this.currentLoans / maxLoans) * 100) : 0;
  }

  /**
   * Get loan capacity color based on usage
   * UI formatting logic
   */
  getLoanCapacityColor(): string {
    const percentage = this.getLoanCapacityPercentage();
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    return '#10b981';
  }

  /**
   * Get formatted created date
   * UI formatting logic
   */
  getDisplayCreatedDate(): string {
    return new Date(this.createdAt).toLocaleDateString('en-US');
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): Member {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      phone: this.phone,
      address: this.address,
      status: this.status,
      currentLoans: this.currentLoans,
      remainingCapacity: this.remainingCapacity,
      createdAt: this.createdAt
    };
  }
}
