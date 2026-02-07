import { describe, it, expect } from 'vitest';
import { MemberModel } from '@/models/Member';
import { mockMembers, mockMemberWithoutPhone, mockMemberWithoutAddress, mockMemberWithLongName, mockMemberWithLongAddress, mockMemberAtCapacity } from '../../mocks/memberData.mock';

/**
 * MemberModel Tests
 * 
 * Tests for MemberModel display logic methods
 * Follows backend pattern: pure unit tests, no external dependencies
 */
describe('MemberModel', () => {
  describe('constructor', () => {
    it('should create instance with valid data', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.id).toBe('member-1');
      expect(member.email).toBe('test1@example.com');
      expect(member.name).toBe('Test Member 1');
      expect(member.phone).toBe('123-456-7890');
      expect(member.address).toBe('123 Test Street, Test City');
      expect(member.status).toBe('ACTIVE');
      expect(member.currentLoans).toBe(2);
      expect(member.remainingCapacity).toBe(3);
    });

    it('should create instance with null phone', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.phone).toBeNull();
    });

    it('should create instance with null address', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.address).toBeNull();
    });
  });

  describe('isActive', () => {
    it('should return true when status is ACTIVE', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.isActive()).toBe(true);
    });

    it('should return false when status is SUSPENDED', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.isActive()).toBe(false);
    });

    it('should return false when status is INACTIVE', () => {
      const member = new MemberModel(mockMembers[2]);

      expect(member.isActive()).toBe(false);
    });
  });

  describe('isSuspended', () => {
    it('should return true when status is SUSPENDED', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.isSuspended()).toBe(true);
    });

    it('should return false when status is ACTIVE', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.isSuspended()).toBe(false);
    });
  });

  describe('isInactive', () => {
    it('should return true when status is INACTIVE', () => {
      const member = new MemberModel(mockMembers[2]);

      expect(member.isInactive()).toBe(true);
    });

    it('should return false when status is ACTIVE', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.isInactive()).toBe(false);
    });
  });

  describe('getStatusColor', () => {
    it('should return green for ACTIVE status', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getStatusColor()).toBe('#10b981');
    });

    it('should return red for SUSPENDED status', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.getStatusColor()).toBe('#ef4444');
    });

    it('should return gray for INACTIVE status', () => {
      const member = new MemberModel(mockMembers[2]);

      expect(member.getStatusColor()).toBe('#6b7280');
    });
  });

  describe('getStatusDisplay', () => {
    it('should return active display text for ACTIVE status', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getStatusDisplay()).toBe('✓ Active');
    });

    it('should return suspended display text for SUSPENDED status', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.getStatusDisplay()).toBe('⚠ Suspended');
    });

    it('should return inactive display text for INACTIVE status', () => {
      const member = new MemberModel(mockMembers[2]);

      expect(member.getStatusDisplay()).toBe('○ Inactive');
    });
  });

  describe('getDisplayName', () => {
    it('should return full name when under max length', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getDisplayName(30)).toBe('Test Member 1');
    });

    it('should truncate name when over max length', () => {
      const member = new MemberModel(mockMemberWithLongName);

      expect(member.getDisplayName(30)).toBe('This is a very long member ...');
    });

    it('should use default max length of 30', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getDisplayName()).toBe('Test Member 1');
    });
  });

  describe('getDisplayPhone', () => {
    it('should return phone when exists', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getDisplayPhone()).toBe('123-456-7890');
    });

    it('should return No phone number when phone is null', () => {
      const member = new MemberModel(mockMemberWithoutPhone);

      expect(member.getDisplayPhone()).toBe('No phone number');
    });
  });

  describe('getDisplayAddress', () => {
    it('should return address when exists', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getDisplayAddress(50)).toBe('123 Test Street, Test City');
    });

    it('should return No address when address is null', () => {
      const member = new MemberModel(mockMemberWithoutAddress);

      expect(member.getDisplayAddress(50)).toBe('No address');
    });

    it('should truncate long address', () => {
      const member = new MemberModel(mockMemberWithLongAddress);

      expect(member.getDisplayAddress(50)).toBe('This is a very long address that should be trun...');
    });

    it('should use default max length of 50', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getDisplayAddress()).toBe('123 Test Street, Test City');
    });
  });

  describe('getLoanCapacityPercentage', () => {
    it('should calculate percentage correctly', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getLoanCapacityPercentage()).toBe(40); // 2/5 = 40%
    });

    it('should return 0 when no loans', () => {
      const member = new MemberModel(mockMembers[2]);

      expect(member.getLoanCapacityPercentage()).toBe(0); // 0/5 = 0%
    });

    it('should return 100 when at capacity', () => {
      const member = new MemberModel(mockMemberAtCapacity);

      expect(member.getLoanCapacityPercentage()).toBe(100); // 5/5 = 100%
    });

    it('should return 0 when no capacity', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.getLoanCapacityPercentage()).toBe(100); // 5/5 = 100%
    });
  });

  describe('getLoanCapacityColor', () => {
    it('should return green when capacity is low', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getLoanCapacityColor()).toBe('#10b981'); // 40% < 70%
    });

    it('should return yellow when capacity is medium', () => {
      const member = new MemberModel({ ...mockMembers[0], currentLoans: 4, remainingCapacity: 1 });

      expect(member.getLoanCapacityColor()).toBe('#f59e0b'); // 80% >= 70% and < 90%
    });

    it('should return red when capacity is high', () => {
      const member = new MemberModel(mockMemberAtCapacity);

      expect(member.getLoanCapacityColor()).toBe('#ef4444'); // 100% >= 90%
    });
  });

  describe('getDisplayCreatedDate', () => {
    it('should format date correctly', () => {
      const member = new MemberModel(mockMembers[0]);

      expect(member.getDisplayCreatedDate()).toBe('1/1/2024');
    });

    it('should format date for different dates', () => {
      const member = new MemberModel(mockMembers[1]);

      expect(member.getDisplayCreatedDate()).toBe('1/2/2024');
    });
  });

  describe('toJSON', () => {
    it('should serialize to plain object', () => {
      const member = new MemberModel(mockMembers[0]);
      const json = member.toJSON();

      expect(json).toEqual(mockMembers[0]);
      expect(json).not.toBeInstanceOf(MemberModel);
    });

    it('should serialize null values correctly', () => {
      const member = new MemberModel(mockMemberWithoutPhone);
      const json = member.toJSON();

      expect(json.phone).toBeNull();
    });
  });
});
