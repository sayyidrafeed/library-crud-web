import { vi } from 'vitest';

/**
 * Test Helper Utilities
 * 
 * Common utilities for test setup and assertions
 * Follows backend pattern of reusable test helpers
 */

/**
 * Create a mock function with type safety
 */
export function createMock<T extends (...args: any[]) => any>(
  implementation?: T
): T {
  return vi.fn(implementation) as T;
}

/**
 * Wait for async operations
 */
export async function wait(ms: number = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Flush all pending promises
 */
export async function flushPromises(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Create a spy on an object method
 */
export function spyOn<T extends object, K extends keyof T>(
  obj: T,
  method: K
): ReturnType<typeof vi.spyOn> {
  return vi.spyOn(obj, method as string);
}

/**
 * Mock a date for consistent testing
 */
export function mockDate(date: Date | string) {
  const mockDate = new Date(date);
  vi.setSystemTime(mockDate);
  return mockDate;
}

/**
 * Reset mocked date
 */
export function resetDate() {
  vi.useRealTimers();
}

/**
 * Create a mock error with status code
 */
export function createApiError(message: string, status: number = 500): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

/**
 * Assert that a promise rejects with specific error
 */
export async function expectReject(
  promise: Promise<any>,
  errorMessage?: string
): Promise<void> {
  await expect(promise).rejects.toThrow(errorMessage);
}

/**
 * Assert that a promise resolves with specific value
 */
export async function expectResolve<T>(
  promise: Promise<T>,
  expectedValue: T
): Promise<void> {
  await expect(promise).resolves.toEqual(expectedValue);
}
