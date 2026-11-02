import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchOfferings } from '../src/services/offeringService';

describe('Product loading', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the products the API responds with', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({
        success: true,
        data: [{ _id: 'p1', title: 'Shivling', slug: 'shivling', price: 501, images: [], isActive: true }]
      })
    });

    const products = await fetchOfferings();
    expect(products).toHaveLength(1);
    expect(products[0].price).toBe(501);
  });

  it('throws on a server error instead of inventing a product', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      headers: { get: () => 'application/json' },
      json: async () => ({ success: false, message: 'Database connection failed' })
    });

    await expect(fetchOfferings()).rejects.toThrow('Database connection failed');
  });

  it('throws when the network is down', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(fetchOfferings()).rejects.toThrow('Failed to fetch');
  });
});
