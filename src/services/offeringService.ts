/**
 * src/services/offeringService.ts
 * Offerings API client with seamless fallback to SEED_OFFERINGS
 */
import { apiRequest } from './apiClient';
import { ProductOffering, ApiResponse } from '../types/api';
import { SEED_OFFERINGS } from '../data/seedOfferings';

export interface GetOfferingsParams {
  category?: string;
  search?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchOfferings(params: GetOfferingsParams = {}): Promise<ApiResponse<ProductOffering[]>> {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.search) query.append('search', params.search);
  if (params.featured !== undefined) query.append('featured', String(params.featured));
  if (params.sort) query.append('sort', params.sort);
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  const queryString = query.toString();
  const endpoint = `/products${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await apiRequest<{
      success: boolean;
      data: ProductOffering[];
      count?: number;
      total?: number;
    }>(endpoint, { timeoutMs: 4000 });

    if (response && response.success && Array.isArray(response.data) && response.data.length > 0) {
      return {
        success: true,
        data: response.data,
        count: response.count || response.data.length,
        total: response.total || response.data.length,
        isFallback: false
      };
    }
    // If backend returns empty array, provide seed offerings
    return getFallbackOfferings(params);
  } catch (error) {
    console.warn('[offeringService] Backend API offline or error; serving sacred seed offerings.', error);
    return getFallbackOfferings(params);
  }
}

export async function fetchOfferingBySlugOrId(slugOrId: string): Promise<ApiResponse<ProductOffering>> {
  try {
    const response = await apiRequest<{ success: boolean; data: ProductOffering }>(
      `/products/${encodeURIComponent(slugOrId)}`,
      { timeoutMs: 4000 }
    );
    if (response && response.success && response.data) {
      return { success: true, data: response.data, isFallback: false };
    }
  } catch (error) {
    console.warn(`[offeringService] Failed to fetch offering '${slugOrId}'; attempting seed lookup.`, error);
  }

  // Fallback lookup
  const found = SEED_OFFERINGS.find(
    (o) => o.slug === slugOrId.toLowerCase() || o._id === slugOrId
  );
  if (found) {
    return { success: true, data: found, isFallback: true };
  }
  throw new Error(`Sacred offering '${slugOrId}' not found.`);
}

function getFallbackOfferings(params: GetOfferingsParams): ApiResponse<ProductOffering[]> {
  let filtered = [...SEED_OFFERINGS];

  if (params.category && params.category !== 'All') {
    filtered = filtered.filter(
      (o) => o.category.toLowerCase() === params.category!.toLowerCase()
    );
  }

  if (params.search) {
    const term = params.search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.title.toLowerCase().includes(term) ||
        o.description.toLowerCase().includes(term) ||
        (o.subtitle && o.subtitle.toLowerCase().includes(term))
    );
  }

  return {
    success: true,
    data: filtered,
    count: filtered.length,
    total: filtered.length,
    isFallback: true
  };
}
