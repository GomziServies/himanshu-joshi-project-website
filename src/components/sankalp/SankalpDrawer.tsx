import React, { useState, useEffect } from 'react';
import { ProductOffering, OfferingTier, DevoteeCustomer } from '../../types/api';
import {
  VEDIC_GOTRAS,
  VEDIC_NAKSHATRAS,
  VEDIC_RASHIS,
  PRAYER_INTENTIONS
} from '../../data/seedOfferings';
import {
  X,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Flame,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';

interface SankalpDrawerProps {
  offering: ProductOffering;
  selectedTier?: OfferingTier;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: DevoteeCustomer, amount: number) => void;
  isLoading?: boolean;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export const SankalpDrawer: React.FC<SankalpDrawerProps> = ({
  offering,
  selectedTier,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<DevoteeCustomer>({
    name: '',
    email: '',
    phone: '',
    sankalpName: '',
    gotra: 'Kashyapa', // Default to Kashyapa per Shastras
    customGotra: '',
    nakshatra: '',
    rashi: '',
    prayerIntention: PRAYER_INTENTIONS[0],
    customPrayer: '',
    familyMembers: [''],
    address: {
      street: '',
      city: '',
      state: 'Uttar Pradesh',
      postalCode: '',
      country: 'India'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or initialize when drawer opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPrice = selectedTier ? selectedTier.price : offering.price;

  // Validation functions
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide devotee full name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address for receipt dispatch.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a valid 10-digit mobile number for WhatsApp tracking.';
    } else if (phoneDigits.length < 10) {
      errs.phone = 'Please enter at least 10 digits.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (formData.gotra === 'Other' && !formData.customGotra?.trim()) {
      errs.customGotra = 'Please specify your ancestral Gotra.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.address.street.trim() || formData.address.street.trim().length < 5) {
      errs.street = 'Please provide full house/street address for Prasad delivery.';
    }
    if (!formData.address.city.trim()) {
      errs.city = 'Please enter delivery city/town.';
    }
    if (!formData.address.state.trim()) {
      errs.state = 'Please select a state.';
    }
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!formData.address.postalCode.trim()) {
      errs.postalCode = 'Please enter 6-digit Indian PIN code.';
    } else if (!pinRegex.test(formData.address.postalCode.trim())) {
      errs.postalCode = 'PIN code must be exactly 6 digits starting with non-zero.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    // Clean family members
    const cleanFamily = formData.familyMembers?.filter((m) => m.trim().length > 0);
    const finalCustomer: DevoteeCustomer = {
      ...formData,
      sankalpName: formData.sankalpName.trim() || formData.name.trim(),
      gotra: formData.gotra === 'Other' && formData.customGotra ? formData.customGotra : formData.gotra,
      familyMembers: cleanFamily
    };

    onSubmit(finalCustomer, currentPrice);
  };

  const addFamilyMember = () => {
    if ((formData.familyMembers || []).length < 4) {
      setFormData((prev) => ({
        ...prev,
        familyMembers: [...(prev.familyMembers || []), '']
      }));
    }
  };

  const removeFamilyMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      familyMembers: (prev.familyMembers || []).filter((_, i) => i !== index)
    }));
  };

  const updateFamilyMember = (index: number, val: string) => {
    const list = [...(formData.familyMembers || [])];
    list[index] = val;
    setFormData((prev) => ({ ...prev, familyMembers: list }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] text-[#1A1412] rounded-2xl shadow-2xl border-2 border-gold-500/50 p-6 sm:p-8 my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold-500/30 pb-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron-500/10 text-saffron-600 text-[11px] font-serif font-bold uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 text-saffron-500 animate-diya-flicker" />
              <span>Devotee Vedic Sankalp Patra</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-maroon-700">
              {offering.title}
            </h3>
            {selectedTier && (
              <span className="text-xs font-serif font-bold text-saffron-600">
                Tier: {selectedTier.name} (₹{selectedTier.price.toLocaleString('en-IN')})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3-Step Wizard Progress Bar */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div
            className={`flex items-center gap-2 text-xs font-serif font-bold ${
              step >= 1 ? 'text-maroon-700' : 'text-stone-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 1 ? 'bg-saffron-500 text-white' : 'bg-stone-200 text-stone-600'
              }`}
            >
              1
            </span>
            <span>यजमान (Devotee)</span>
          </div>
          <div className="flex-1 h-0.5 bg-stone-200 mx-2" />
          <div
            className={`flex items-center gap-2 text-xs font-serif font-bold ${
              step >= 2 ? 'text-maroon-700' : 'text-stone-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 2 ? 'bg-saffron-500 text-white' : 'bg-stone-200 text-stone-600'
              }`}
            >
              2
            </span>
            <span>गोत्र व संकल्प (Sankalp)</span>
          </div>
          <div className="flex-1 h-0.5 bg-stone-200 mx-2" />
          <div
            className={`flex items-center gap-2 text-xs font-serif font-bold ${
              step === 3 ? 'text-maroon-700' : 'text-stone-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step === 3 ? 'bg-saffron-500 text-white' : 'bg-stone-200 text-stone-600'
              }`}
            >
              3
            </span>
            <span>प्रसाद पता (Delivery)</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* STEP 1: Devotee Personal & WhatsApp Contact */}
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div className="bg-cream-100 p-3 rounded-lg border border-gold-500/20 text-stone-700 leading-relaxed">
                Enter primary devotee credentials. Verification receipts, live darshan link, and Speed Post tracking will be dispatched to these contact coordinates.
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Devotee Full Name (यजमान का पूरा नाम) *
                </label>
                <input
                  type="text"
                  placeholder="Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                />
                {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Ancestral Gotra (कुल गोत्र)
                </label>
                <input
                  type="text"
                  placeholder="Kashyapa"
                  value={formData.gotra}
                  onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                />
                <span className="text-[10px] text-stone-500">
                  Default: Kashyapa (Universal Vedic progenitor). Can be modified here or detailed in Step 2.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                  />
                  {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    Email Address (ईमेल - रसीद हेतु) *
                  </label>
                  <input
                    type="email"
                    placeholder="devotee@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                  />
                  {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Sankalp Name for Chanting (यदि यजमान से भिन्न हो)
                </label>
                <input
                  type="text"
                  placeholder="Defaults to devotee full name"
                  value={formData.sankalpName}
                  onChange={(e) => setFormData({ ...formData, sankalpName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                />
                <span className="text-[10px] text-stone-500">
                  Name to be vocalized by the Acharyas in the Sanskrit Sankalp mantra.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Vedic Sankalp, Gotra, Nakshatra & Prayer Intention */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <div className="bg-amber-50 p-3 rounded-lg border border-gold-500/30 text-stone-800 space-y-1">
                <strong className="text-maroon-700 block font-serif">
                  ॥ गोत्र एवं शास्त्रीय विधान ॥
                </strong>
                <p>
                  Sanatan Shastric Rule: If you do not know your biological Gotra, <strong>Kashyapa Gotra (कश्यप)</strong> is universally ordained by the Rishis as all beings descend from Rishi Kashyapa (*सर्वे प्रजाः कश्यप सम्भवाः*).
                </p>
              </div>

              <div>
                <label htmlFor="gotra-select" className="font-semibold text-stone-800 block mb-1">
                  Ancestral Gotra Selection (कुल गोत्र) *
                </label>
                <select
                  id="gotra-select"
                  aria-label="Ancestral Gotra Selection"
                  value={formData.gotra}
                  onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                >
                  <option value="Kashyapa">Kashyapa (कश्यप - Universal Progenitor Default)</option>
                  {VEDIC_GOTRAS.filter((g) => g.value !== 'Kashyapa').map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {formData.gotra === 'Other' && (
                  <input
                    type="text"
                    placeholder="Enter custom Gotra"
                    value={formData.customGotra || ''}
                    onChange={(e) => setFormData({ ...formData, customGotra: e.target.value })}
                    className="mt-2 w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none"
                  />
                )}
                {errors.customGotra && <p className="text-red-600 mt-1">{errors.customGotra}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    Janma Nakshatra (जन्म नक्षत्र - Optional)
                  </label>
                  <select
                    value={formData.nakshatra}
                    onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                  >
                    <option value="">Select Nakshatra (if known)</option>
                    {VEDIC_NAKSHATRAS.map((nak) => (
                      <option key={nak} value={nak}>
                        {nak}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    Moon Rashi (चन्द्र राशि - Optional)
                  </label>
                  <select
                    value={formData.rashi}
                    onChange={(e) => setFormData({ ...formData, rashi: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                  >
                    <option value="">Select Rashi (if known)</option>
                    {VEDIC_RASHIS.map((ras) => (
                      <option key={ras} value={ras}>
                        {ras}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Primary Devotional Intention (संकल्प मनोरथ) *
                </label>
                <select
                  value={formData.prayerIntention}
                  onChange={(e) => setFormData({ ...formData, prayerIntention: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                >
                  {PRAYER_INTENTIONS.map((intention, idx) => (
                    <option key={idx} value={intention}>
                      {intention}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Family Members */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-stone-800 block">
                    Additional Family Members (कुल-परिवार नाम - Optional)
                  </label>
                  {(formData.familyMembers || []).length < 4 && (
                    <button
                      type="button"
                      onClick={addFamilyMember}
                      className="text-xs text-saffron-600 hover:text-saffron-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Member
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {(formData.familyMembers || []).map((member, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Family Member ${idx + 1}`}
                        value={member}
                        onChange={(e) => updateFamilyMember(idx, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none text-xs"
                      />
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => removeFamilyMember(idx)}
                          className="p-2 text-stone-400 hover:text-red-600 rounded cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Consecrated Prasad Postal Delivery */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Prasad Box containing the Consecrated Lingam, Gangajal, Bhasma & Seva Certificate is dispatched via insured India Post Speed Post. Enter accurate delivery address.
                </p>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Street Address & Flat / Door No. (पूरा डाक पता) *
                </label>
                <textarea
                  rows={2}
                  placeholder="Flat No, Apartment / House Name, Street, Area"
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                />
                {errors.street && <p className="text-red-600 mt-1">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    City / Town (शहर) *
                  </label>
                  <input
                    type="text"
                    placeholder="Varanasi"
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                  />
                  {errors.city && <p className="text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    State (राज्य) *
                  </label>
                  <select
                    value={formData.address.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-600 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    PIN Code (6 अंक) *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="221001"
                    value={formData.address.postalCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, postalCode: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-saffron-500 bg-white text-stone-900 focus:outline-none"
                  />
                  {errors.postalCode && <p className="text-red-600 mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Order Summary Confirmation */}
              <div className="p-3 rounded-xl bg-cream-100 border border-gold-500/30 flex items-center justify-between text-xs mt-2">
                <div>
                  <span className="text-stone-500 block uppercase">Offering Dakshina Total</span>
                  <span className="font-serif font-bold text-stone-900 text-sm">
                    {offering.title} {selectedTier ? `(${selectedTier.name})` : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-extrabold text-maroon-700">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-800 block font-semibold">
                    No Hidden Taxes or Shipping
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-lg bg-maroon-700 hover:bg-maroon-800 text-white font-serif font-bold text-xs flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <span>Continue to Step {step + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="px-7 py-3 rounded-lg bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-600 text-white font-serif font-bold text-sm flex items-center gap-2 cursor-pointer shadow-diya disabled:opacity-50"
              >
                <Lock className="w-4 h-4 text-gold-300" />
                <span>
                  {isLoading ? 'Processing...' : `Proceed to Sacred Dakshina (₹${currentPrice.toLocaleString('en-IN')})`}
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SankalpDrawer;
