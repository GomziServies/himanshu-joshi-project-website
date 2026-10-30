/**
 * src/data/seedOfferings.ts
 * High-fidelity fallback offerings ensuring 100% browsing uptime.
 * Dedicated to Sri Salahkareshwar Mahadev Tirth (Vadodara).
 */
import { ProductOffering, OfferingTier } from '../types/api';

export const SHIVLING_STHAPANA_TIERS: OfferingTier[] = [
  {
    id: 'tier-salahkareshwar-standard',
    name: 'Salahkareshwar Shivling Sthapana',
    hindiName: 'सलाहकारेश्वर महादेव शिवलिंग स्थापना',
    price: 5100,
    originalPrice: 7100,
    badge: 'Most Popular Devotee Choice',
    description: 'Authentic 3.5" to 4" Swayambhu Shivling with solid brass Yoni Peeth, Vedic Pran Pratishtha, and 108 Bilva Archana.',
    lingamSpecs: '3.5" – 4.0" Natural Swayambhu Shivling Stone',
    jaladhariSpecs: 'Solid Heavy Brass Base (1.2 kg) with Trishul engraving',
    priests: 2,
    duration: '2.5 Hours',
    prasadHighlights: [
      'Consecrated Salahkareshwar Mahadev Shivling with Brass Base',
      '50ml Holy Gangajal',
      '25g Consecrated Temple Bhasma',
      '5-Mukhi Rudraksha & Copper Shiva Coin',
      'Seva Certificate with QR Verification'
    ],
    inclusions: [
      'Devotee Gotra Sankalp',
      'Panchamrit Abhishek',
      'Consecrated Swayambhu Shivling',
      'Brass Yoni Peeth',
      'Standard Prasad Box Delivery'
    ]
  }
];

export const SEED_OFFERINGS: ProductOffering[] = [
  {
    _id: 'seed-shivling-sthapana-01',
    title: 'Salahkareshwar Shivling Sthapana',
    slug: 'shivling-sthapana',
    category: 'Offering',
    subtitle: 'श्री सलाहकारेश्वर महादेव शिवलिंग स्थापना एवं षोडशोपचार वैदिक प्रतिष्ठा',
    description: `The sacred Shivling Sthapana is among the most revered Vedic rituals described in the Shiva Purana. Consecrated directly at the sacred sanctum of Sri Salahkareshwar Mahadev Tirth in Gotri, Vadodara, the Swayambhu Shivling holds the divine vibrational resonance of Lord Shiva.

During this auspicious Seva:
1. Ganpati Puja & Punyahavachanam for purifying the altar and removing impediments.
2. Kalash Sthapana & Invocation of Divine Deities through ancient Rigvedic hymns.
3. Consecration (Pran Pratishtha) transferring divine cosmic energy into the Lingam.
4. Detailed Rudrabhishek with 5 sacred liquids (Panchamrit) and bilva patra offerings.
5. Sankalp blessing uttered in the devotee's specific Gotra and Nakshatra for prosperity and longevity.

The consecrated Prasad box is carefully packed and dispatched via Speed Post directly to your residence, carrying the holy sanctum blessings to your home temple.`,
    shortDescription:
      'Consecrate your home altar with an authentic Swayambhu Shivling blessed at Sri Salahkareshwar Mahadev Tirth, installed with Vedic Pran Pratishtha and 108 Bilva Archana.',
    price: 5100,
    originalPrice: 7100,
    currency: 'INR',
    images: [
      '/salahkareshwar-shivling.jpg',
      '/punya-passport-logo.jpg',
      '/punya-passport-medallion.jpg'
    ],
    featuredImage: '/salahkareshwar-shivling.jpg',
    inStock: true,
    stockQuantity: 108,
    isActive: true,
    isFeatured: true,
    displayOrder: 1,
    prasadIncludes: [
      'Consecrated Salahkareshwar Mahadev Shivling with Brass Yoni Peeth',
      'Sanctum Bhasma & Holy Gangajal vial (100ml)',
      '108-bead Sacred Panchmukhi Rudraksha Mala',
      'Silver-plated Consecrated Bilva Leaf',
      'Pure Copper Shiva Yantra Energized Coin',
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
      sanctum: 'Salahkareshwar Mahadev Tirth Sanctum & Yagyashala',
      samagriProvided: true
    },
    specifications: [
      { key: 'Deity', value: 'Lord Shiva (Mahadev)' },
      { key: 'Shivling Stone', value: 'Swayambhu Sanctified Stone (Salahkareshwar)' },
      { key: 'Base (Yoni Peeth)', value: 'Pure Heavy Solid Brass with Engraved Tridents' },
      { key: 'Vedic Samhita', value: 'Rigvedic Rudra Sukta & Agamic Vidhi' },
      { key: 'Fulfillment', value: 'Puja Video Recording + Sanctified Prasad Box Delivery' }
    ],
    tiers: SHIVLING_STHAPANA_TIERS
  }
];

export const VEDIC_GOTRAS: Array<{ value: string; label: string; isDefault?: boolean }> = [
  { value: 'Kashyapa', label: 'Kashyapa (कश्यप - Universal Progenitor Default)', isDefault: true },
  { value: 'Bharadvaja', label: 'Bharadvaja (भारद्वाज)' },
  { value: 'Vashistha', label: 'Vashistha (वशिष्ठ)' },
  { value: 'Vishvamitra', label: 'Vishvamitra (विश्वामित्र)' },
  { value: 'Gautama', label: 'Gautama (गौतम)' },
  { value: 'Jamadagni', label: 'Jamadagni (जमदग्नि)' },
  { value: 'Atri', label: 'Atri (अत्रि)' },
  { value: 'Agastya', label: 'Agastya (अगस्त्य)' },
  { value: 'Angirasa', label: 'Angirasa (अंगिरस)' },
  { value: 'Shandilya', label: 'Shandilya (शाण्डिल्य)' },
  { value: 'Garg', label: 'Garg / Garga (गर्ग)' },
  { value: 'Kaushik', label: 'Kaushik (कौशिक)' },
  { value: 'Harita', label: 'Harita (हारीत)' },
  { value: 'Parashara', label: 'Parashara (पराशर)' },
  { value: 'Vatsa', label: 'Vatsa (वत्स)' },
  { value: 'Mudgala', label: 'Mudgala (मुद्गल)' },
  { value: 'Kaundinya', label: 'Kaundinya (कौण्डिन्य)' },
  { value: 'Other', label: 'Other / Specify Custom Gotra' }
];

export const VEDIC_NAKSHATRAS: string[] = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
  'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const VEDIC_RASHIS: string[] = [
  'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
  'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrischika (Scorpio)',
  'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
];

export const PRAYER_INTENTIONS: string[] = [
  'Family Peace, Health & Spiritual Auspiciousness (पारिवारिक सुख एवं आरोग्य)',
  'Removal of Obstacles & Career Growth (कार्य सिद्धि एवं बाधा निवारण)',
  'Longevity, Vitality & Maha Mrityunjaya Blessings (दीर्घायु एवं स्वास्थ्य रक्षा)',
  'Lineage Prosperity & Welfare of Children (संतान कल्याण एवं वंश वृद्धि)',
  'Ancestral Peace & Pitra Tripti (पितृ तृप्ति एवं शान्ति)',
  'Spiritual Awakening & Divine Grace of Lord Shiva (आत्मिक शान्ति एवं शिव कृपा)'
];
