import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock window.print
window.print = vi.fn();

// Mock window.scrollTo
window.scrollTo = vi.fn();

export function setupRazorpayMock() {
  const RazorpayMock = vi.fn(function (this: any, options: any) {
    this.options = options;
    this.open = vi.fn();
    this.on = vi.fn();
  });

  (window as any).Razorpay = RazorpayMock;
  return RazorpayMock;
}

beforeEach(() => {
  setupRazorpayMock();
});

afterEach(() => {
  cleanup();
});
