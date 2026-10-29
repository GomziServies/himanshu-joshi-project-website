import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchOfferings, fetchOfferingBySlugOrId } from '../src/services/offeringService';
import { fetchBanners } from '../src/services/bannerService';
import { SEED_OFFERINGS } from '../src/data/seedOfferings';
import { SEED_BANNERS } from '../src/data/seedBanners';

describe('API Client & Zero-Downtime Fallback Engine', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('successfully returns dynamic offerings when backend API responds HTTP 200', async () => {
    const mockApiResponse = {
      success: true,
      data: [
        {
          _id: 'db-product-101',
          title: 'Special Shravan Shivling Sthapana',
          slug: 'special-shravan',
          category: 'Offering',
          price: 5100,
          currency: 'INR',
          images: [],
          featuredImage: '',
          inStock: true,
          isActive: true,
          isFeatured: true,
          prasadIncludes: ['Vibhuti'],
          ritualsIncluded: ['Abhishek']
        }
      ]
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => mockApiResponse
    });

    const result = await fetchOfferings();
    expect(result.success).toBe(true);
    expect(result.isFallback).toBe(false);
    expect(result.data[0].title).toBe('Special Shravan Shivling Sthapana');
  });

  it('transparently falls back to SEED_OFFERINGS when backend server returns HTTP 500', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      headers: { get: () => 'application/json' },
      json: async () => ({ success: false, message: 'Database connection failed' })
    });

    const result = await fetchOfferings();
    expect(result.success).toBe(true);
    expect(result.isFallback).toBe(true);
    expect(result.data.length).toBe(SEED_OFFERINGS.length);
    expect(result.data[0].slug).toBe('shivling-sthapana');
  });

  it('transparently falls back to SEED_OFFERINGS when network drops completely (fetch rejects)', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    const result = await fetchOfferings();
    expect(result.success).toBe(true);
    expect(result.isFallback).toBe(true);
    expect(result.data).toEqual(SEED_OFFERINGS);
  });

  it('filters fallback offerings by category when backend is offline', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Network Error'));

    const result = await fetchOfferings({ category: 'Puja' });
    expect(result.success).toBe(true);
    expect(result.isFallback).toBe(true);
    expect(result.data.every((item) => item.category === 'Puja')).toBe(true);
  });

  it('resolves individual offering by slug from seed data when backend is down', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    const result = await fetchOfferingBySlugOrId('shivling-sthapana');
    expect(result.success).toBe(true);
    expect(result.isFallback).toBe(true);
    expect(result.data.slug).toBe('shivling-sthapana');
  });

  it('returns fallback banners when GET /banners fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    const result = await fetchBanners();
    expect(result.success).toBe(true);
    expect(result.isFallback).toBe(true);
    expect(result.data).toEqual(SEED_BANNERS);
  });
});
