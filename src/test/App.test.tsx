import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Customer Temple Website (himanshu-joshi-project-website)', () => {
  it('renders the sacred temple navbar and brand title', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/Shree Somnath Sanctum/i);
    expect(brandElements.length).toBeGreaterThan(0);
    expect(brandElements[0]).toBeInTheDocument();
  });

  it('renders the flagship Shivling Sthapana showcase section', () => {
    render(<App />);
    expect(screen.getAllByText(/Shivling Sthapana/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Vedic Authentic Sanctum Specifications/i)).toBeInTheDocument();
  });

  it('renders pricing and the Sankalp booking button', () => {
    render(<App />);
    const bookingButtons = screen.getAllByRole('button', { name: /Book/i });
    expect(bookingButtons.length).toBeGreaterThan(0);
  });

  it('opens the Sankalp modal when clicking Book Shivling Sthapana', () => {
    render(<App />);
    const ctaButton = screen.getByText(/Book Shivling Sthapana & Enter Gotra Sankalp/i);
    fireEvent.click(ctaButton);
    expect(screen.getByText(/Devotee Vedic Sankalp Patra/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Rajesh Sharma/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Kashyapa/i)).toBeInTheDocument();
  });

  it('renders the temple trust footer with registration details', () => {
    render(<App />);
    expect(screen.getByText(/Registered Vedic Religious & Charitable Trust/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashashwamedh Ghat Road, Varanasi/i)).toBeInTheDocument();
  });
});
