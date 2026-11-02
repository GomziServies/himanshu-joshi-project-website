import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SankalpDrawer } from '../src/components/sankalp/SankalpDrawer';
import { CheckoutLine, ProductOffering } from '../src/types/api';

const offering: ProductOffering = {
  _id: 'product_1',
  title: 'Salahkareshwar Mahadev Shivling',
  slug: 'salahkareshwar-shivling',
  category: 'Offering',
  description: 'A Shivling blessed at the temple.',
  price: 501,
  images: [],
  isActive: true
};

const lines: CheckoutLine[] = [{ product: offering, quantity: 1 }];

function fillValidForm() {
  const fill = (label: RegExp, value: string) =>
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fill(/Full name/i, 'Amit Sharma');
  fill(/Mobile number/i, '+91 98765 43210');
  fill(/Email/i, 'amit@sharma.org');
  fill(/House and street/i, 'B-108 Shiv Kripa, Gotri Road');
  fill(/City/i, 'Vadodara');
  fill(/PIN code/i, '390012');
  fill(/State/i, 'Gujarat');
}

describe('Checkout form', () => {
  it('shows the total on the pay button', () => {
    render(<SankalpDrawer lines={lines} isOpen onClose={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Pay ₹501/ })).toBeInTheDocument();
  });

  it('multiplies by quantity and shows it', () => {
    render(<SankalpDrawer lines={[{ product: offering, quantity: 3 }]} isOpen onClose={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Pay ₹1,503/ })).toBeInTheDocument();
    expect(screen.getByText('Quantity 3')).toBeInTheDocument();
  });

  it('totals several products', () => {
    const second = { ...offering, _id: 'product_2', price: 251 };
    render(
      <SankalpDrawer
        lines={[{ product: offering, quantity: 2 }, { product: second, quantity: 1 }]}
        isOpen
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: /Pay ₹1,253/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3 offerings' })).toBeInTheDocument();
  });

  it('blocks payment and lists every missing required field', () => {
    const onSubmit = vi.fn();
    render(<SankalpDrawer lines={lines} isOpen onClose={vi.fn()} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /Pay ₹501/ }));

    expect(screen.getByText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/valid 10-digit mobile/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/house and street\./i)).toBeInTheDocument();
    expect(screen.getByText(/enter your city/i)).toBeInTheDocument();
    expect(screen.getByText(/select your state/i)).toBeInTheDocument();
    expect(screen.getByText(/PIN code must be 6 digits/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it.each([['12345'], ['5876543210'], ['98765432101234']])('rejects the mobile number %s', (phone) => {
    render(<SankalpDrawer lines={lines} isOpen onClose={vi.fn()} onSubmit={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/Mobile number/i), { target: { value: phone } });
    fireEvent.click(screen.getByRole('button', { name: /Pay ₹501/ }));
    expect(screen.getByText(/valid 10-digit mobile/i)).toBeInTheDocument();
  });

  it('submits a trimmed customer, with gotra optional', () => {
    const onSubmit = vi.fn();
    render(<SankalpDrawer lines={lines} isOpen onClose={vi.fn()} onSubmit={onSubmit} />);

    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Pay ₹501/ }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Amit Sharma',
      phone: '+91 98765 43210',
      email: 'amit@sharma.org',
      gotra: '',
      address: {
        street: 'B-108 Shiv Kripa, Gotri Road',
        city: 'Vadodara',
        state: 'Gujarat',
        postalCode: '390012',
        country: 'India'
      }
    });
  });

  it('shows a payment error inside the form', () => {
    render(<SankalpDrawer lines={lines} isOpen onClose={vi.fn()} onSubmit={vi.fn()} error="Network problem" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Network problem');
  });

  it('cannot be closed while a payment is in progress', () => {
    const onClose = vi.fn();
    render(<SankalpDrawer lines={lines} isOpen onClose={onClose} onSubmit={vi.fn()} isLoading />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Please wait/i })).toBeDisabled();
  });
});
