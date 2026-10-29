import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initiateRazorpayCheckout } from '../src/services/checkoutService';
import { SEED_OFFERINGS } from '../src/data/seedOfferings';
import { DevoteeCustomer } from '../src/types/api';
import { setupRazorpayMock } from '../src/test/setup';

describe('Razorpay Checkout Lifecycle & Payment Verification', () => {
  const dummyOffering = SEED_OFFERINGS[0];
  const dummyCustomer: DevoteeCustomer = {
    name: 'Devotee Sharma',
    email: 'sharma@example.com',
    phone: '+919876543210',
    sankalpName: 'Devotee Sharma & Family',
    gotra: 'Kashyapa',
    address: {
      street: '12 Temple St',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      postalCode: '221001',
      country: 'India'
    }
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    setupRazorpayMock();
  });

  it('calls /orders/create-order, instantiates Razorpay with #8B0000 theme, and verifies payment on success', async () => {
    const mockOrderResponse = {
      success: true,
      orderId: 'mongo_order_999',
      orderNumber: 'ORD-20261029-999',
      razorpayOrderId: 'order_rzp_999',
      amount: 510000,
      currency: 'INR',
      key: 'rzp_test_key123'
    };

    const mockVerifyResponse = {
      success: true,
      message: 'Payment verified and receipt dispatched successfully',
      orderId: 'mongo_order_999',
      orderNumber: 'ORD-20261029-999',
      receiptNumber: 'RCPT-20261029-999',
      amount: 5100
    };

    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes('/orders/create-order')) {
        return {
          ok: true,
          status: 201,
          headers: { get: () => 'application/json' },
          json: async () => mockOrderResponse
        };
      }
      if (url.includes('/orders/verify-payment')) {
        return {
          ok: true,
          status: 200,
          headers: { get: () => 'application/json' },
          json: async () => mockVerifyResponse
        };
      }
      return { ok: false, status: 404 };
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await initiateRazorpayCheckout({
      request: {
        customer: {
          name: dummyCustomer.name,
          email: dummyCustomer.email,
          phone: dummyCustomer.phone,
          sankalpName: dummyCustomer.sankalpName,
          gotra: dummyCustomer.gotra,
          address: dummyCustomer.address
        },
        items: [{ productId: dummyOffering._id, quantity: 1 }]
      },
      offering: dummyOffering,
      onSuccess,
      onError
    });

    // Assert Razorpay instance opened
    const rzpInstance = (window.Razorpay as any).mock?.instances?.[0];
    expect(rzpInstance).toBeDefined();
    expect(rzpInstance.open).toHaveBeenCalled();
    expect(rzpInstance.options.theme.color).toBe('#8B0000');
    expect(rzpInstance.options.order_id).toBe('order_rzp_999');

    // Simulate Razorpay payment success callback
    await rzpInstance.options.handler({
      razorpay_order_id: 'order_rzp_999',
      razorpay_payment_id: 'pay_test_123',
      razorpay_signature: 'valid_sig_hex'
    });

    // Assert verify-payment was dispatched and onSuccess received receipt
    expect(onSuccess).toHaveBeenCalledWith(mockVerifyResponse);
    expect(onError).not.toHaveBeenCalled();
  });

  it('handles server rejection on order creation gracefully', async () => {
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes('/orders/create-order')) {
        return {
          ok: false,
          status: 400,
          headers: { get: () => 'application/json' },
          json: async () => ({ success: false, message: 'Invalid product selection' })
        };
      }
      return { ok: false, status: 404 };
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await initiateRazorpayCheckout({
      request: {
        customer: {
          name: dummyCustomer.name,
          email: dummyCustomer.email,
          phone: dummyCustomer.phone,
          sankalpName: dummyCustomer.sankalpName,
          gotra: dummyCustomer.gotra,
          address: dummyCustomer.address
        },
        items: [{ productId: 'invalid_id', quantity: 1 }]
      },
      offering: dummyOffering,
      onSuccess,
      onError
    });

    expect(onError).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('triggers onDismiss callback when devotee dismisses modal', async () => {
    const mockOrderResponse = {
      success: true,
      orderId: 'mongo_order_999',
      orderNumber: 'ORD-20261029-999',
      razorpayOrderId: 'order_rzp_999',
      amount: 510000,
      currency: 'INR',
      key: 'rzp_test_key123'
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      headers: { get: () => 'application/json' },
      json: async () => mockOrderResponse
    });

    const onDismiss = vi.fn();

    await initiateRazorpayCheckout({
      request: {
        customer: {
          name: dummyCustomer.name,
          email: dummyCustomer.email,
          phone: dummyCustomer.phone,
          sankalpName: dummyCustomer.sankalpName,
          gotra: dummyCustomer.gotra,
          address: dummyCustomer.address
        },
        items: [{ productId: dummyOffering._id, quantity: 1 }]
      },
      offering: dummyOffering,
      onSuccess: vi.fn(),
      onError: vi.fn(),
      onDismiss
    });

    const rzpInstance = (window.Razorpay as any).mock?.instances?.[0];
    expect(rzpInstance).toBeDefined();

    // Trigger modal dismissal
    rzpInstance.options.modal.ondismiss();
    expect(onDismiss).toHaveBeenCalled();
  });
});
