/**
 * src/services/offeringService.ts
 * Loads the products on sale. Price and availability only ever come from the server,
 * so failures throw and the page shows a retry rather than a stale price.
 */
import { apiRequest } from './apiClient';
import { ProductOffering } from '../types/api';

export async function fetchOfferings(): Promise<ProductOffering[]> {
  const response = await apiRequest<{ success: boolean; data: ProductOffering[] }>('/products?limit=100', {
    timeoutMs: 15000
  });
  return response.data;
}
