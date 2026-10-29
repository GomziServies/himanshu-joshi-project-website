/**
 * src/data/seedBanners.ts
 * High-fidelity fallback hero banners ensuring an auspicious landing experience.
 */
import { Banner } from '../types/api';

export const SEED_BANNERS: Banner[] = [
  {
    _id: 'seed-banner-01',
    title: 'पवित्र शिवलिंग स्थापना सेवा',
    subtitle: 'घर-आँगन में साक्षात महादेव की कृपा — वैदिक प्राण प्रतिष्ठा एवं संपूर्ण पूजा सामग्री के साथ काशी से सीधा प्रेषण।',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1920&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    ctaText: 'स्थापना सेवा बुक करें',
    ctaLink: '#shivling-sthapana',
    badgeText: 'विशेष वैदिक अनुष्ठान',
    displayOrder: 1,
    isActive: true
  },
  {
    _id: 'seed-banner-02',
    title: 'महा रुद्राभिषेक एवं 108 बेलपत्र अर्चना',
    subtitle: 'काशी के विद्वान वेदपाठी ब्राह्मणों द्वारा आपके नाम व गोत्र से विशेष संकल्प एवं अभिमंत्रित प्रसाद की घर डिलीवरी।',
    imageUrl: 'https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=1920&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=800&q=80',
    ctaText: 'रुद्राभिषेक संकल्प लें',
    ctaLink: '#offerings',
    badgeText: 'श्रावण विशेष अनुष्ठान',
    displayOrder: 2,
    isActive: true
  },
  {
    _id: 'seed-banner-03',
    title: 'अखंड ज्योत एवं नित्य महाप्रसाद सेवा',
    subtitle: 'मंदिर के मुख्य गर्भगृह में आपके कुल-परिवार के कल्याण हेतु नित्य दीप प्रज्वलन एवं गंगाजल, भस्म महाप्रसाद।',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1920&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    ctaText: 'महाप्रसाद प्राप्त करें',
    ctaLink: '#offerings',
    badgeText: 'दैनिक सेवा',
    displayOrder: 3,
    isActive: true
  }
];
