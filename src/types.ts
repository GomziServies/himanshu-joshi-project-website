export interface Product {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  shortDescription?: string;
  description: string;
  images: string[];
  featuredImage?: string;
  inStock: boolean;
  stockQuantity?: number;
  isActive: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
  prasadIncludes?: string[];
  ritualsIncluded?: string[];
  ritualDetails?: {
    duration?: string;
    priestsCount?: number;
    sanctum?: string;
    samagriProvided?: boolean;
  };
  specifications?: Array<{ key: string; value: string }>;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  badgeText?: string;
  displayOrder?: number;
  isActive: boolean;
}

export interface DevoteeSankalp {
  name: string;
  email: string;
  phone: string;
  sankalpName: string;
  gotra: string;
  nakshatra?: string;
  ceremonyDate?: string;
  prayerIntention?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface OrderResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  razorpayOrderId?: string;
  amount: number;
  currency: string;
  key?: string;
  message?: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  orderId: string;
  orderNumber: string;
  receiptNumber?: string;
  amount: number;
  pdfUrl?: string;
}

