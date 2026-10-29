/**
 * src/data/seedOfferings.ts
 * High-fidelity fallback offerings ensuring 100% browsing uptime.
 */
import { ProductOffering, OfferingTier } from '../types/api';

export const SHIVLING_STHAPANA_TIERS: OfferingTier[] = [
  {
    id: 'tier-narmadeshwar-standard',
    name: 'Narmadeshwar Shivling Sthapana',
    hindiName: 'नर्मदेश्वर शिवलिंग स्थापना',
    price: 5100,
    originalPrice: 7100,
    badge: 'Most Popular Devotee Choice',
    description: 'Authentic 3.5" to 4" Swayambhu Narmada River stone with solid brass Yoni Peeth, Vedic Pran Pratishtha, and 108 Bilva Archana.',
    lingamSpecs: '3.5" – 4.0" Natural Narmada River Stone',
    jaladhariSpecs: 'Solid Heavy Brass Base (1.2 kg) with Trishul engraving',
    priests: 2,
    duration: '2.5 Hours',
    prasadHighlights: [
      'Consecrated Narmadeshwar Shivling with Brass Base',
      '50ml Holy Gangajal from Kashi',
      '25g Consecrated Temple Bhasma',
      '5-Mukhi Nepal Rudraksha & Copper Shiva Coin',
      'Seva Certificate with QR Verification'
    ],
    inclusions: [
      'Devotee Gotra Sankalp',
      'Panchamrit Abhishek',
      'Consecrated Narmadeshwar Shivling',
      'Brass Yoni Peeth',
      'Standard Prasad Box Delivery'
    ]
  },
  {
    id: 'tier-maha-sthapana-rudra',
    name: 'Maha Sthapana & 108 Rudrabhishek',
    hindiName: 'महा स्थापना एवं १०८ रुद्राभिषेक',
    price: 11000,
    originalPrice: 15000,
    badge: 'Complete Family Consecration',
    description: '5" Premium Dark Narmadeshwar Stone with Ashtadhatu Jaladhari, full Laghu Rudra chanting by 3 Acharyas, and silver bilva archana.',
    lingamSpecs: '5.0" Dark Narmadeshwar / Krishna Shila Pebble',
    jaladhariSpecs: 'Ashtadhatu (8-metal alloy) Base (2.1 kg) with snake motif',
    priests: 3,
    duration: '3.5 Hours',
    prasadHighlights: [
      'Consecrated Shivling with Ashtadhatu Jaladhari',
      '108-bead 5-Mukhi Rudraksha Japa Mala',
      'Pure Silver Consecrated Bilva Leaf',
      '100ml Brass Kalash Gangajal & Vibhuti',
      'Personalized Puja Video Recording (USB / Cloud)'
    ],
    inclusions: [
      'Special 108 Rudrabhishek',
      'Ashtadhatu Base',
      'Pure Silver Bilva Patra',
      '108-bead Rudraksha Japa Mala',
      'Puja Video Recording'
    ]
  },
  {
    id: 'tier-kashi-sanctum-eternal',
    name: 'Kashi Sanctum Eternal Sthapana',
    hindiName: 'काशी गर्भगृह नित्य स्थापना',
    price: 21000,
    originalPrice: 28000,
    badge: 'Supreme Lineage Blessing',
    description: '6.5" Master Narmada Shivling with 99.9% Pure Silver Jaladhari, Nagabharan, 11 Dravya Maha Abhishek, and permanent family Gotra copper plate inscription.',
    lingamSpecs: '6.5" Master Swayambhu Narmadeshwar with Janeu Marking',
    jaladhariSpecs: 'Pure Sterling Silver (Chandi) Base & Multi-hood Vasuki (Nagabharan)',
    priests: 5,
    duration: '5.0 Hours + 48-day Mandala Diya',
    prasadHighlights: [
      'Master Shivling with Pure Silver Base & Nagabharan',
      '10g Pure Silver Embossed Shiva Coin',
      '108-bead Collector Rudraksha Kantha Mala',
      '1kg Royal Dry Fruit Mahaprasad Box',
      'Framed Lineage Consecration Tamra-Patra Certificate'
    ],
    inclusions: [
      'Pure Sterling Silver Jaladhari & Nagabharan',
      '10g Silver Shiva Coin',
      'Lineage Copper Plate Inscription',
      '48-Day Akhanda Diya',
      'VIP Darshan Pass & Video Recording'
    ]
  }
];

export const SEED_OFFERINGS: ProductOffering[] = [
  {
    _id: 'seed-shivling-sthapana-01',
    title: 'Shivling Sthapana & Pran Pratishtha Seva',
    slug: 'shivling-sthapana',
    category: 'Offering',
    subtitle: 'Sacred Narmadeshwar Shivling Consecration with Vedic Pandits & Pran Pratishtha',
    description: `The sacred Shivling Sthapana is among the most revered Vedic rituals described in the Shiva Purana. Sourced directly from the sanctified Narmada River bed, the naturally rounded Swayambhu Narmadeshwar stone holds the vibrational resonance of Lord Shiva.

During this auspicious Seva:
1. Ganpati Puja & Punyahavachanam for purifying the altar and removing impediments.
2. Kalash Sthapana & Invocation of Divine Deities through ancient Rigvedic hymns.
3. Consecration (Pran Pratishtha) transferring divine cosmic energy into the Lingam.
4. Detailed Rudrabhishek with 5 sacred liquids (Panchamrit) and bilva patra offerings.
5. Sankalp blessing uttered in the devotee's specific Gotra and Nakshatra for prosperity and longevity.

The consecrated Prasad box is carefully packed and dispatched via Speed Post directly to your residence, carrying the holy sanctum blessings to your home temple.`,
    shortDescription:
      'Consecrate your home altar with an authentic Swayambhu Narmadeshwar Shivling, installed with Vedic Pran Pratishtha and 108 Bilva Archana.',
    price: 5100,
    originalPrice: 7100,
    currency: 'INR',
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
      'Sanctum Bhasma & Holy Gangajal vial from Varanasi (100ml)',
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
      sanctum: 'Main Garbhagriha & Temple Yagyashala',
      samagriProvided: true
    },
    specifications: [
      { key: 'Deity', value: 'Lord Shiva (Mahadev)' },
      { key: 'Shivling Stone', value: 'Original Narmada River Natural Pebble (Swayambhu)' },
      { key: 'Base (Yoni Peeth)', value: 'Pure Heavy Solid Brass with Engraved Tridents' },
      { key: 'Vedic Samhita', value: 'Rigvedic Rudra Sukta & Shukla Yajurvedic Vidhi' },
      { key: 'Fulfillment', value: 'Puja Video Recording + Sanctified Prasad Box Delivery' }
    ],
    tiers: SHIVLING_STHAPANA_TIERS
  },
  {
    _id: 'seed-rudrabhishek-02',
    title: 'Maha Rudrabhishek & 108 Bilva Archana',
    slug: 'rudrabhishek-puja',
    category: 'Puja',
    subtitle: 'Elaborate Rudra Chanting for Family Health, Peace, and Removal of Graha Dosha',
    description:
      'A powerful spiritual recitation invoking the 11 forms of Lord Shiva for relief from ailments, ancestral peace, and spiritual illumination. Performed by two Vedic scholars chanting Sri Rudram with fresh cow milk, honey, sugarcane juice, and 108 fresh bilva leaves.',
    shortDescription: 'Dedicated Rudrabhishek Seva with Sri Rudram Namakam-Chamakam recitation and sanctified dry fruits prasad.',
    price: 2100,
    originalPrice: 3100,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop'],
    featuredImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
    inStock: true,
    stockQuantity: 500,
    isActive: true,
    isFeatured: true,
    displayOrder: 2,
    prasadIncludes: [
      'Rudrabhishek Sacred Bhasma from Sanctum',
      'Sanctified Dry Fruit Prasad Box',
      'Blessed Raksha Sutra Protective Thread',
      'Holy Gangajal Vial'
    ],
    ritualsIncluded: [
      'Sri Rudram Recitation',
      'Panchamrit Snan',
      '108 Bilva Patra Samarpana',
      'Devotee Gotra Sankalp'
    ],
    ritualDetails: {
      duration: '1.5 Hours',
      priestsCount: 2,
      sanctum: 'Shiva Mandapam',
      samagriProvided: true
    },
    specifications: [
      { key: 'Ritual Type', value: 'Panchamrit Rudrabhishek' },
      { key: 'Chanting', value: 'Namakam Chamakam Complete Recitation' }
    ]
  },
  {
    _id: 'seed-mrityunjaya-03',
    title: 'Maha Mrityunjaya Jaap & Havan (1,100 Chants)',
    slug: 'maha-mrityunjaya-jaap',
    category: 'Ritual',
    subtitle: 'Intensive Vedic Havan for Longevity, Protection, and Vital Energy',
    description:
      'The Maha Mrityunjaya Mantra is the great death-conquering mantra from the Rigveda, generating healing vibrations that dissolve fear and negativity. Consecrated Yagya with 1,100 sacred oblations into the consecrated fire pit by 3 priests for supreme spiritual protection and recovery.',
    shortDescription: 'Consecrated fire ritual with herbs and cow ghee to seek Shiva’s divine protection against chronic ailments.',
    price: 11000,
    originalPrice: 15000,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop'],
    featuredImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop',
    inStock: true,
    stockQuantity: 50,
    isActive: true,
    isFeatured: false,
    displayOrder: 3,
    prasadIncludes: [
      'Consecrated Havan Bhasma',
      'Panchamrit Dry Fruit Prasad',
      'Blessed Pure Copper Yantra',
      'Raksha Thread & Certificate'
    ],
    ritualsIncluded: [
      '1,100 Maha Mrityunjaya Chants',
      'Vedic Havan with Pure Desi Cow Ghee',
      'Purna Ahuti & Aarti'
    ],
    ritualDetails: {
      duration: '3.5 Hours',
      priestsCount: 3,
      sanctum: 'Temple Yagya Shala',
      samagriProvided: true
    },
    specifications: [
      { key: 'Oblations', value: '1,100 Ahutis with Ghee and Sacred Herbs' }
    ]
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
