import type { Member, CreateMemberRequest, UpdateMemberRequest } from '@/types';

/**
 * Mock Member Data
 * 
 * Provides sample member objects for testing
 * Follows backend pattern of clear, descriptive mock data
 */
export const mockMembers: Member[] = [
  {
    id: 'member-1',
    email: 'test1@example.com',
    name: 'Test Member 1',
    phone: '123-456-7890',
    address: '123 Test Street, Test City',
    status: 'ACTIVE',
    currentLoans: 2,
    remainingCapacity: 3,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'member-2',
    email: 'test2@example.com',
    name: 'Test Member 2',
    phone: null,
    address: null,
    status: 'SUSPENDED',
    currentLoans: 5,
    remainingCapacity: 0,
    createdAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 'member-3',
    email: 'test3@example.com',
    name: 'Test Member 3',
    phone: '987-654-3210',
    address: '456 Test Avenue, Test Town',
    status: 'INACTIVE',
    currentLoans: 0,
    remainingCapacity: 5,
    createdAt: '2024-01-03T00:00:00.000Z'
  }
];

export const mockCreateMemberRequest: CreateMemberRequest = {
  email: 'newmember@example.com',
  name: 'New Member',
  phone: '555-123-4567',
  address: '789 New Street, New City'
};

export const mockUpdateMemberRequest: UpdateMemberRequest = {
  name: 'Updated Name',
  phone: '555-987-6543',
  address: 'Updated Address'
};

export const mockMemberWithoutPhone: Member = {
  id: 'member-4',
  email: 'nophone@example.com',
  name: 'Member Without Phone',
  phone: null,
  address: '123 Test Street',
  status: 'ACTIVE',
  currentLoans: 1,
  remainingCapacity: 4,
  createdAt: '2024-01-04T00:00:00.000Z'
};

export const mockMemberWithoutAddress: Member = {
  id: 'member-5',
  email: 'noaddress@example.com',
  name: 'Member Without Address',
  phone: '123-456-7890',
  address: null,
  status: 'ACTIVE',
  currentLoans: 0,
  remainingCapacity: 5,
  createdAt: '2024-01-05T00:00:00.000Z'
};

export const mockMemberWithLongName: Member = {
  id: 'member-6',
  email: 'longname@example.com',
  name: 'This is a very long member name that should be truncated when displayed in the UI because it exceeds the maximum allowed length',
  phone: '123-456-7890',
  address: '123 Test Street',
  status: 'ACTIVE',
  currentLoans: 2,
  remainingCapacity: 3,
  createdAt: '2024-01-06T00:00:00.000Z'
};

export const mockMemberWithLongAddress: Member = {
  id: 'member-7',
  email: 'longaddress@example.com',
  name: 'Test Member',
  phone: '123-456-7890',
  address: 'This is a very long address that should be truncated when displayed in the UI because it exceeds the maximum allowed length for addresses',
  status: 'ACTIVE',
  currentLoans: 1,
  remainingCapacity: 4,
  createdAt: '2024-01-07T00:00:00.000Z'
};

export const mockMemberAtCapacity: Member = {
  id: 'member-8',
  email: 'atcapacity@example.com',
  name: 'Member At Capacity',
  phone: '123-456-7890',
  address: '123 Test Street',
  status: 'ACTIVE',
  currentLoans: 5,
  remainingCapacity: 0,
  createdAt: '2024-01-08T00:00:00.000Z'
};
