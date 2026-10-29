import { Product, Banner, DevoteeSankalp, OrderResponse, PaymentVerificationResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback initial offerings in case API is temporarily offline
export const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'prod_fallback_1',
    title: 'Shivling Sthapana & Rudrabhishek Offering',
    slug: 'shivling-sthapana',
    category: 'Offering',
    subtitle: 'Sacred Narmadeshwar Shivling Consecration with Vedic Pran Pratishtha & Bilva Abhishek',
    price: 5100,
    originalPrice: 7100,
    shortDescription: 'Consecrate your home with an authentic Narmadeshwar Shivling installed with Vedic rituals, followed by a personalized Rudrabhishek performed in your family Gotra.',
    description: 'The sacred Shivling Sthapana is among the most revered Vedic rituals described in the Shiva Purana. Sourced directly from the sanctified Narmada River bed, the naturally rounded Swayambhu Narmadeshwar stone holds the vibrational resonance of Lord Shiva.\n\nDuring this auspicious Seva:\n1. Ganpati Puja & Punyahavachanam for purifying the altar.\n2. Kalash Sthapana & Invocation of Divine Deities.\n3. Pran Pratishtha transferring divine cosmic energy into the Lingam.\n4. Detailed Rudrabhishek with 5 sacred liquids (Panchamrit) and bilva patra offerings.\n5. Sankalp blessing uttered in the devotee\'s specific Gotra and Nakshatra.',
    images: [
      'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=1200&auto=format&fit=crop',
    inStock: true,
    stockQuantity: 108,
    isActive: true,
    isFeatured: true,
    displayOrder: 1,
    prasadIncludes: [
      'Consecrated Narmadeshwar Shivling with Brass Yoni Peeth',
      'Sanctum Bhasma & Holy Gangajal vial from Varanasi',
      '108-bead Sacred Panchmukhi Rudraksha Mala',
      'Silver-plated Consecrated Bilva Leaf',
      'Blessed Raksha Sutra Thread',
      'Official Seva Certificate signed by Head Priest'
    ],
    ritualsIncluded: [
      'Ganpati & Kalash Sthapana',
      'Vedic Pran Pratishtha',
      'Panchamrit Rudrabhishek',
      '108 Bilva Archana',
      'Family Gotra Sankalp'
    ],
    ritualDetails: {
      duration: '2.5 Hours',
      priestsCount: 2,
      sanctum: 'Temple Inner Sanctum & Yagyashala',
      samagriProvided: true
    },
    specifications: [
      { key: 'Lingam Stone', value: 'Original Narmada River Natural Pebble' },
      { key: 'Base (Yoni Peeth)', value: 'Pure Solid Brass with Engraved Tridents' },
      { key: 'Vedic Samhita', value: 'Rigvedic Rudra Sukta & Namakam-Chamakam' },
      { key: 'Fulfillment', value: 'Puja Video Recording + Sanctified Prasad Box' }
    ]
  },
  {
    _id: 'prod_fallback_2',
    title: 'Maha Rudrabhishek & 108 Bilva Archana',
    slug: 'rudrabhishek-puja',
    category: 'Puja',
    subtitle: 'Elaborate Rudra Chanting for Family Health, Peace, and Removal of Graha Dosha',
    price: 2100,
    originalPrice: 3100,
    shortDescription: 'Dedicated Rudrabhishek Seva performed by two Vedic scholars chanting Sri Rudram with fresh cow milk, honey, sugarcane juice, and 108 fresh bilva leaves.',
    description: 'A powerful spiritual recitation invoking the 11 forms of Lord Shiva for relief from ailments, ancestral peace, and spiritual illumination.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
    inStock: true,
    stockQuantity: 500,
    isActive: true,
    isFeatured: true,
    displayOrder: 2,
    prasadIncludes: [
      'Rudrabhishek Sacred Bhasma',
      'Sanctified Dry Fruit Prasad Box',
      'Blessed Raksha Sutra'
    ],
    ritualsIncluded: [
      'Sri Rudram Recitation',
      'Panchamrit Snan',
      'Bilva Patra Samarpana'
    ]
  }
];

export const FALLBACK_BANNERS: Banner[] = [
  {
    _id: 'banner_fallback_1',
    title: 'Maha Shivling Sthapana & Vedic Abhishek',
    subtitle: 'Invite Divine Auspiciousness, Peace & Prosperity into your home with consecrated Narmadeshwar Shivling',
    imageUrl: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Book Shivling Seva',
    ctaLink: '#shivling-section',
    badgeText: 'Sacred Consecration Offering',
    displayOrder: 1,
    isActive: true
  },
  {
    _id: 'banner_fallback_2',
    title: 'Shravan Somwar Special Rudrabhishek',
    subtitle: 'Perform laghu-rudra archana in your family Gotra for health, longevity, and divine grace',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Explore Offerings',
    ctaLink: '#offerings-catalog',
    badgeText: 'Auspicious Month Seva',
    displayOrder: 2,
    isActive: true
  }
];

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
    return FALLBACK_PRODUCTS;
  } catch (err) {
    console.warn('Backend API /products unreachable, using fallback offerings', err);
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${API_BASE}/banners`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
    return FALLBACK_BANNERS;
  } catch (err) {
    console.warn('Backend API /banners unreachable, using fallback banners', err);
    return FALLBACK_BANNERS;
  }
}

export async function createOrder(payload: {
  customer: DevoteeSankalp;
  items: Array<{ productId: string; quantity: number }>;
}): Promise<OrderResponse> {
  const res = await fetch(`${API_BASE}/orders/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to initialize order on server');
  }
  return data;
}

export async function verifyPayment(payload: {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<PaymentVerificationResponse> {
  const res = await fetch(`${API_BASE}/orders/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Payment signature verification failed');
  }
  return data;
}

