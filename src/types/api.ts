/**
 * src/types/api.ts
 * Type definitions for Offerings, Banners, Orders, Devotee Sankalp, and Receipts.
 */

export type OfferingCategory = 'Offering' | 'Puja' | 'Prasad' | 'Seva' | 'Ritual' | 'Merchandise';

export interface RitualSpecification {
  key: string;
  value: string;
}

export interface RitualDetails {
  duration?: string;
  priestsCount?: number;
  sanctum?: string;
  samagriProvided?: boolean;
}

export interface OfferingTier {
  id: string;
  name: string;
  hindiName?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  lingamSpecs?: string;
  jaladhariSpecs?: string;
  priests?: number;
  duration?: string;
  prasadHighlights?: string[];
  inclusions?: string[];
}

export interface ProductOffering {
  _id: string;
  title: string;
  slug: string;
  category: OfferingCategory | string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  currency: 'INR' | string;
  images: string[];
  featuredImage?: string;
  inStock: boolean;
  stockQuantity?: number;
  isActive: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
  prasadIncludes?: string[];
  ritualsIncluded?: string[];
  ritualDetails?: RitualDetails;
  specifications?: RitualSpecification[];
  tiers?: OfferingTier[];
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  badgeText?: string;
  displayOrder?: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export interface DevoteeAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface DevoteeCustomer {
  name: string;
  email: string;
  phone: string;
  sankalpName: string;
  gotra: string;
  customGotra?: string;
  nakshatra?: string;
  rashi?: string;
  prayerIntention?: string;
  customPrayer?: string;
  familyMembers?: string[];
  address: DevoteeAddress;
}

export interface CreateOrderRequest {
  customer: {
    name: string;
    email: string;
    phone: string;
    sankalpName: string;
    gotra: string;
    nakshatra?: string;
    rashi?: string;
    prayerIntention?: string;
    address: DevoteeAddress;
  };
  items: Array<{
    productId: string;
    quantity: number;
    tierId?: string;
  }>;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  razorpayOrderId: string;
  amount: number; // in paise
  currency: string;
  key: string;
  message?: string;
}

export interface VerifyPaymentRequest {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  orderId: string;
  orderNumber: string;
  receiptNumber: string;
  amount: number;
  isDuplicate?: boolean;
  pdfUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  message?: string;
  isFallback?: boolean;
}
