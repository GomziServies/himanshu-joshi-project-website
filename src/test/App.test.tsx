import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Customer Temple Website (himanshu-joshi-project-website)', () => {
  it('renders the sacred temple navbar and brand title', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/Salahkareshwar Mahadev Tirth/i);
    expect(brandElements.length).toBeGreaterThan(0);
    expect(brandElements[0]).toBeInTheDocument();
    expect(screen.getAllByText(/पुण्य पासपोर्ट/i).length).toBeGreaterThan(0);
  });

  it('renders the flagship Shivling Sthapana showcase section', () => {
    render(<App />);
    expect(screen.getAllByText(/Shivling Sthapana/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Salahkareshwar Sanctum Specifications/i)).toBeInTheDocument();
  });

  it('renders pricing and the Sankalp booking button', () => {
    render(<App />);
    const bookingButtons = screen.getAllByRole('button');
    expect(bookingButtons.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/5,100/i).length).toBeGreaterThan(0);
  });

  it('opens the Sankalp modal when clicking Book Shivling Sthapana', () => {
    render(<App />);
    const ctaButton = screen.getAllByText(/SELECTED SACRED TIER/i)[0];
    fireEvent.click(ctaButton);
    expect(screen.getByText(/Devotee Vedic Sankalp Patra/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Rajesh Sharma/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Kashyapa/i)).toBeInTheDocument();
  });

  it('renders the temple trust footer with registration and bank details', () => {
    render(<App />);
    expect(screen.getByText(/ABETS6872M/i)).toBeInTheDocument();
    expect(screen.getByText(/UDYAM-GJ-24-0064289/i)).toBeInTheDocument();
    expect(screen.getByText(/Gotri Sevasi Road, New Alkapuri, Vadodara/i)).toBeInTheDocument();
    expect(screen.getByText(/Kotak Mahindra Bank/i)).toBeInTheDocument();
    expect(screen.getByText(/Salahkareshwar@kotak/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 98256 00778/i)).toBeInTheDocument();
  });
});
