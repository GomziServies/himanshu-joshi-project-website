/**
 * src/types/api.ts
 * Type definitions for products, checkout, and receipts.
 */

export interface ProductOffering {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  price: number;
  currency?: string;
  images: string[];
  featuredImage?: string;
  isActive: boolean;
  prasadIncludes?: string[];
}

export interface CheckoutLine {
  product: ProductOffering;
  quantity: number;
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
  gotra: string;
  address: DevoteeAddress;
}

export interface CreateOrderRequest {
  customer: DevoteeCustomer & { sankalpName: string };
  items: Array<{
    productId: string;
    quantity: number;
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
  isDemo?: boolean;
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
}
