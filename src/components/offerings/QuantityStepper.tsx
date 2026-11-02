import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY } from '../../context/CartContext';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

const BUTTON_CLASS =
  'flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-ivory-100 disabled:cursor-not-allowed disabled:opacity-35';

export const QuantityStepper: React.FC<QuantityStepperProps> = ({ value, onChange, label = 'Quantity' }) => (
  <div className="inline-flex items-center overflow-hidden rounded-full border border-brass-500 bg-white" role="group" aria-label={label}>
    <button type="button" className={BUTTON_CLASS} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity">
      <Minus className="h-4 w-4" />
    </button>
    <output className="w-9 text-center text-lg font-semibold text-ink" aria-live="polite">{value}</output>
    <button type="button" className={BUTTON_CLASS} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label="Increase quantity">
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

export default QuantityStepper;
