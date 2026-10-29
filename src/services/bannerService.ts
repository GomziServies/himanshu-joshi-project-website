/**
 * src/services/bannerService.ts
 * Banners API client with seamless fallback to SEED_BANNERS
 */
import { apiRequest } from './apiClient';
import { Banner, ApiResponse } from '../types/api';
import { SEED_BANNERS } from '../data/seedBanners';

export async function fetchBanners(): Promise<ApiResponse<Banner[]>> {
  try {
    const response = await apiRequest<{ success: boolean; data: Banner[] }>('/banners', {
      timeoutMs: 3500
    });
    if (response && response.success && Array.isArray(response.data) && response.data.length > 0) {
      return {
        success: true,
        data: response.data,
        count: response.data.length,
        isFallback: false
      };
    }
  } catch (error) {
    console.warn('[bannerService] Backend banners unreachable; serving sacred seed banners.', error);
  }

  return {
    success: true,
    data: SEED_BANNERS,
    count: SEED_BANNERS.length,
    isFallback: true
  };
}
