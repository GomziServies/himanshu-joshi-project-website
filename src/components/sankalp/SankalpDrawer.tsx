import React, { useEffect, useRef, useState } from 'react';
import { Lock, X } from 'lucide-react';
import { CheckoutLine, DevoteeCustomer } from '../../types/api';

interface SankalpDrawerProps {
  lines: CheckoutLine[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: DevoteeCustomer) => void;
  isLoading?: boolean;
  error?: string | null;
}

const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal'
];

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  gotra: '',
  street: '',
  city: '',
  state: '',
  postalCode: ''
};

type FormValues = typeof EMPTY_FORM;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';

  // Accepts 98765 43210, +91 9876543210 and 09876543210
  const phone = values.phone.replace(/\D/g, '').replace(/^0/, '');
  if (!/^(91)?[6-9]\d{9}$/.test(phone)) errors.phone = 'Please enter a valid 10-digit mobile number.';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.street.trim().length < 5) errors.street = 'Please enter your house and street.';
  if (!values.city.trim()) errors.city = 'Please enter your city.';
  if (!values.state) errors.state = 'Please select your state.';
  if (!/^[1-9]\d{5}$/.test(values.postalCode.trim())) errors.postalCode = 'PIN code must be 6 digits.';
  return errors;
}

export const SankalpDrawer: React.FC<SankalpDrawerProps> = ({
  lines,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null
}) => {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    firstFieldRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const price = `₹${total.toLocaleString('en-IN')}`;
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const first = lines[0].product;

  const bind = (field: keyof FormValues) => ({
    id: `checkout-${field}`,
    value: values[field],
    'aria-invalid': Boolean(errors[field]),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      gotra: values.gotra.trim(),
      address: {
        street: values.street.trim(),
        city: values.city.trim(),
        state: values.state,
        postalCode: values.postalCode.trim(),
        country: 'India'
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-sanctum/70 backdrop-blur-sm" onClick={() => !isLoading && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="sheet-in flex h-full w-full max-w-md flex-col bg-ivory-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="jaali flex items-center gap-3 bg-sanctum px-5 py-4 text-ivory-50">
          <img
            src={first.featuredImage || first.images?.[0] || '/salahkareshwar-shivling.jpg'}
            alt=""
            className="h-14 w-14 rounded-t-full border border-brass-500 object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 id="checkout-title" className="font-title text-lg leading-snug text-brass-300">
              {lines.length === 1 ? first.title : `${itemCount} offerings`}
            </h2>
            <p className="text-lg font-semibold leading-tight">
              {price}
              {lines.length === 1 && itemCount > 1 && (
                <span className="ml-2 text-base font-normal text-ivory-200/80">Quantity {itemCount}</span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full p-2 text-ivory-200 transition-colors hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            <div>
              <label htmlFor="checkout-name" className="field-label">Full name</label>
              <input {...bind('name')} ref={firstFieldRef} type="text" autoComplete="name" className="field" />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-phone" className="field-label">Mobile number</label>
                <input {...bind('phone')} type="tel" autoComplete="tel" inputMode="tel" className="field" />
                {errors.phone && <p className="field-error">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="checkout-gotra" className="field-label">
                  Gotra <span className="font-normal text-ink-muted">(optional)</span>
                </label>
                <input {...bind('gotra')} type="text" className="field" />
              </div>
            </div>

            <div>
              <label htmlFor="checkout-email" className="field-label">Email (for your receipt)</label>
              <input {...bind('email')} type="email" autoComplete="email" inputMode="email" className="field" />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="checkout-street" className="field-label">House and street</label>
              <input {...bind('street')} type="text" autoComplete="street-address" className="field" />
              {errors.street && <p className="field-error">{errors.street}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-city" className="field-label">City</label>
                <input {...bind('city')} type="text" autoComplete="address-level2" className="field" />
                {errors.city && <p className="field-error">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="checkout-postalCode" className="field-label">PIN code</label>
                <input {...bind('postalCode')} type="text" autoComplete="postal-code" inputMode="numeric" maxLength={6} className="field" />
                {errors.postalCode && <p className="field-error">{errors.postalCode}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="checkout-state" className="field-label">State</label>
              <select {...bind('state')} autoComplete="address-level1" className="field">
                <option value="">Select state</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="field-error">{errors.state}</p>}
            </div>
          </div>

          <div className="border-t border-ivory-200 bg-white px-5 py-4">
            {error && (
              <p role="alert" className="mb-3 rounded-lg bg-sindoor-500/10 px-3 py-2 font-medium text-sindoor-600">
                {error}
              </p>
            )}
            <button type="submit" disabled={isLoading} className="btn-offer w-full !text-xl">
              <Lock className="h-4 w-4" />
              {isLoading ? 'Please wait...' : `Pay ${price}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SankalpDrawer;
