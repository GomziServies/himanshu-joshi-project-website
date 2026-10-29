import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SankalpDrawer } from '../src/components/sankalp/SankalpDrawer';
import { SEED_OFFERINGS, SHIVLING_STHAPANA_TIERS } from '../src/data/seedOfferings';

describe('Devotee Sankalp Form & Wizard Validation', () => {
  const dummyOffering = SEED_OFFERINGS[0];
  const dummyTier = SHIVLING_STHAPANA_TIERS[0];

  it('renders modal with default Gotra as Kashyapa', () => {
    render(
      <SankalpDrawer
        offering={dummyOffering}
        selectedTier={dummyTier}
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByText(/Devotee Vedic Sankalp Patra/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Rajesh Sharma/i)).toBeInTheDocument();
  });

  it('validates Step 1 required fields (name, phone, email) and blocks next step', () => {
    render(
      <SankalpDrawer
        offering={dummyOffering}
        selectedTier={dummyTier}
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    const continueButton = screen.getByRole('button', { name: /Continue to Step 2/i });
    fireEvent.click(continueButton);

    expect(screen.getByText(/Please provide devotee full name/i)).toBeInTheDocument();
    expect(screen.getByText(/Please provide a valid 10-digit mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/Please provide an email address/i)).toBeInTheDocument();
  });

  it('advances to Step 2 when valid devotee contact is entered, verifying Kashyapa default', () => {
    render(
      <SankalpDrawer
        offering={dummyOffering}
        selectedTier={dummyTier}
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Rajesh Sharma/i), {
      target: { value: 'Amit Sharma' }
    });
    fireEvent.change(screen.getByPlaceholderText(/\+91/i), {
      target: { value: '9876543210' }
    });
    fireEvent.change(screen.getByPlaceholderText(/devotee@example.com/i), {
      target: { value: 'amit@sharma.org' }
    });

    const continueButton = screen.getByRole('button', { name: /Continue to Step 2/i });
    fireEvent.click(continueButton);

    // Should now be on Step 2
    expect(screen.getByText(/॥ गोत्र एवं शास्त्रीय विधान ॥/i)).toBeInTheDocument();
    // Verify Gotra select has Kashyapa selected
    const gotraSelect = screen.getByRole('combobox', { name: /Ancestral Gotra/i });
    expect(gotraSelect).toHaveValue('Kashyapa');
  });

  it('validates Step 3 address fields and 6-digit PIN code format', async () => {
    const onSubmit = vi.fn();
    render(
      <SankalpDrawer
        offering={dummyOffering}
        selectedTier={dummyTier}
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    // Fill Step 1
    fireEvent.change(screen.getByPlaceholderText(/Rajesh Sharma/i), {
      target: { value: 'Amit Sharma' }
    });
    fireEvent.change(screen.getByPlaceholderText(/\+91/i), {
      target: { value: '9876543210' }
    });
    fireEvent.change(screen.getByPlaceholderText(/devotee@example.com/i), {
      target: { value: 'amit@sharma.org' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Continue to Step 2/i }));

    // Advance through Step 2
    fireEvent.click(screen.getByRole('button', { name: /Continue to Step 3/i }));

    // In Step 3: try submitting without filling address
    const submitButton = screen.getByRole('button', { name: /Proceed to Sacred Dakshina/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Please provide full house\/street address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter delivery city\/town/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter 6-digit Indian PIN code/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    // Enter invalid 4-digit pincode
    fireEvent.change(screen.getByPlaceholderText(/221001/i), { target: { value: '2210' } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/PIN code must be exactly 6 digits/i)).toBeInTheDocument();

    // Fill valid address and valid 6-digit PIN code
    fireEvent.change(screen.getByPlaceholderText(/Flat No/i), {
      target: { value: 'B-108 Shiv Kripa, Dashashwamedh Ghat Road' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Varanasi/i), { target: { value: 'Varanasi' } });
    fireEvent.change(screen.getByPlaceholderText(/221001/i), { target: { value: '221001' } });

    // Submit form
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Amit Sharma',
        email: 'amit@sharma.org',
        phone: '9876543210',
        gotra: 'Kashyapa',
        address: expect.objectContaining({
          street: 'B-108 Shiv Kripa, Dashashwamedh Ghat Road',
          city: 'Varanasi',
          postalCode: '221001',
          state: 'Uttar Pradesh',
          country: 'India'
        })
      }),
      5100
    );
  });
});
