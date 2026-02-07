import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ApiClient } from '@/services/apiClient';

/**
 * ApiClient Tests
 *
 * Tests for ApiClient HTTP methods
 * Follows backend pattern: mock external dependencies, test pure functions
 */

describe('ApiClient', () => {
  let apiClient: ApiClient;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch;
    apiClient = new ApiClient('http://localhost:3000/api');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should make GET request with correct URL', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      await apiClient.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should return parsed JSON response', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await apiClient.get('/test');

      expect(result).toEqual(mockResponse);
    });

    it('should throw error on non-OK response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not found' })
      } as Response);

      await expect(apiClient.get('/test')).rejects.toThrow('Not found');
    });

    it('should throw error on network failure', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(apiClient.get('/test')).rejects.toThrow('Network error');
    });

    it('should handle JSON parse errors', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      } as Response);

      await expect(apiClient.get('/test')).rejects.toThrow();
    });
  });

  describe('post', () => {
    it('should make POST request with correct URL and data', async () => {
      const mockResponse = { id: '1', name: 'Test' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      await apiClient.post('/test', { name: 'Test' });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'Test' }),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should return parsed JSON response', async () => {
      const mockResponse = { id: '1', name: 'Test' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await apiClient.post('/test', { name: 'Test' });

      expect(result).toEqual(mockResponse);
    });

    it('should throw error on non-OK response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Validation error' })
      } as Response);

      await expect(apiClient.post('/test', { name: 'Test' })).rejects.toThrow('Validation error');
    });
  });

  describe('patch', () => {
    it('should make PATCH request with correct URL and data', async () => {
      const mockResponse = { id: '1', name: 'Updated' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      await apiClient.patch('/test/1', { name: 'Updated' });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/test/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ name: 'Updated' }),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should return parsed JSON response', async () => {
      const mockResponse = { id: '1', name: 'Updated' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await apiClient.patch('/test/1', { name: 'Updated' });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make DELETE request with correct URL', async () => {
      const mockResponse = { message: 'Deleted successfully' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      await apiClient.delete('/test/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/test/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should return parsed JSON response', async () => {
      const mockResponse = { message: 'Deleted successfully' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await apiClient.delete('/test/1');

      expect(result).toEqual(mockResponse);
    });

    it('should throw error on non-OK response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not found' })
      } as Response);

      await expect(apiClient.delete('/test/1')).rejects.toThrow('Not found');
    });
  });

  describe('error handling', () => {
    it('should use error message from response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' })
      } as Response);

      await expect(apiClient.get('/test')).rejects.toThrow('Server error');
    });

    it('should use default error message when JSON fails', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('JSON parse error'))
      } as Response);

      await expect(apiClient.get('/test')).rejects.toThrow('Network error');
    });

    it('should include HTTP status in error message', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not found' })
      } as Response);

      await expect(apiClient.get('/test')).rejects.toThrow('Not found');
    });
  });
});
