import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initiateRazorpayCheckout } from '../src/services/checkoutService';
import { CreateOrderRequest } from '../src/types/api';
import { setupRazorpayMock } from '../src/test/setup';

const offering = { _id: 'product_1', title: 'Salahkareshwar Mahadev Shivling' };

const request: CreateOrderRequest = {
  customer: {
    name: 'Devotee Sharma',
    email: 'sharma@example.com',
    phone: '+919876543210',
    sankalpName: 'Devotee Sharma'
  },
  items: [{ productId: offering._id, quantity: 1 }]
};

const orderResponse = {
  success: true,
  orderId: 'mongo_order_999',
  orderNumber: 'ORD-20261030-ABC123',
  razorpayOrderId: 'order_rzp_999',
  amount: 50100,
  currency: 'INR',
  key: 'rzp_test_key123',
  isDemo: false
};

const verifyResponse = {
  success: true,
  message: 'Payment verified and receipt dispatched successfully',
  orderId: 'mongo_order_999',
  orderNumber: 'ORD-20261030-ABC123',
  receiptNumber: 'RCPT-20261030-ABC123',
  amount: 501
};

function mockApi(order: object = orderResponse) {
  const fetchMock = vi.fn().mockImplementation(async (url: string) => {
    if (url.includes('/orders/create-order')) {
      return { ok: true, status: 201, headers: { get: () => 'application/json' }, json: async () => order };
    }
    if (url.includes('/orders/verify-payment')) {
      return { ok: true, status: 200, headers: { get: () => 'application/json' }, json: async () => verifyResponse };
    }
    return { ok: false, status: 404, headers: { get: () => 'application/json' }, json: async () => ({}) };
  });
  globalThis.fetch = fetchMock;
  return fetchMock;
}

function verifyCallBody(fetchMock: ReturnType<typeof vi.fn>) {
  const call = fetchMock.mock.calls.find(([url]) => String(url).includes('/orders/verify-payment'));
  return call ? JSON.parse(call[1].body) : null;
}

describe('Checkout', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    setupRazorpayMock();
  });

  it('opens Razorpay with the server amount and verifies the payment on success', async () => {
    const fetchMock = mockApi();
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const confirmTestPayment = vi.fn();

    await initiateRazorpayCheckout({ request, description: offering.title, confirmTestPayment, onSuccess, onError });

    const rzp = (window.Razorpay as any).mock.instances[0];
    expect(rzp.open).toHaveBeenCalled();
    expect(rzp.options.amount).toBe(50100);
    expect(rzp.options.order_id).toBe('order_rzp_999');
    expect(confirmTestPayment).not.toHaveBeenCalled();

    await rzp.options.handler({
      razorpay_order_id: 'order_rzp_999',
      razorpay_payment_id: 'pay_test_123',
      razorpay_signature: 'valid_sig_hex'
    });

    expect(verifyCallBody(fetchMock).razorpay_signature).toBe('valid_sig_hex');
    expect(onSuccess).toHaveBeenCalledWith(verifyResponse);
    expect(onError).not.toHaveBeenCalled();
  });

  it('asks for confirmation in demo mode and never opens Razorpay', async () => {
    const fetchMock = mockApi({ ...orderResponse, isDemo: true });
    const onSuccess = vi.fn();

    await initiateRazorpayCheckout({
      request,
      description: offering.title,
      confirmTestPayment: async () => true,
      onSuccess,
      onError: vi.fn()
    });

    expect((window.Razorpay as any).mock.instances).toHaveLength(0);
    expect(verifyCallBody(fetchMock).razorpay_signature).toBe('demo_mock_signature');
    expect(onSuccess).toHaveBeenCalledWith(verifyResponse);
  });

  it('does not verify anything when a demo payment is cancelled', async () => {
    const fetchMock = mockApi({ ...orderResponse, isDemo: true });
    const onSuccess = vi.fn();
    const onDismiss = vi.fn();

    await initiateRazorpayCheckout({
      request,
      description: offering.title,
      confirmTestPayment: async () => false,
      onSuccess,
      onError: vi.fn(),
      onDismiss
    });

    expect(verifyCallBody(fetchMock)).toBeNull();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalled();
  });

  it('reports a server rejection when creating the order', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: { get: () => 'application/json' },
      json: async () => ({ success: false, message: 'Offering is currently not available' })
    });
    const onSuccess = vi.fn();
    const onError = vi.fn();

    await initiateRazorpayCheckout({
      request,
      description: offering.title,
      confirmTestPayment: vi.fn(),
      onSuccess,
      onError
    });

    expect(onError.mock.calls[0][0].message).toBe('Offering is currently not available');
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('gives the payment ID when verification fails after a payment', async () => {
    mockApi();
    const onError = vi.fn();

    await initiateRazorpayCheckout({
      request,
      description: offering.title,
      confirmTestPayment: vi.fn(),
      onSuccess: vi.fn(),
      onError
    });

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: { get: () => 'application/json' },
      json: async () => ({ success: false, message: 'Invalid payment signature' })
    });

    const rzp = (window.Razorpay as any).mock.instances[0];
    await rzp.options.handler({
      razorpay_order_id: 'order_rzp_999',
      razorpay_payment_id: 'pay_test_123',
      razorpay_signature: 'bad'
    });

    expect(onError.mock.calls[0][0].message).toContain('pay_test_123');
  });

  it('calls onDismiss when the Razorpay modal is closed', async () => {
    mockApi();
    const onDismiss = vi.fn();

    await initiateRazorpayCheckout({
      request,
      description: offering.title,
      confirmTestPayment: vi.fn(),
      onSuccess: vi.fn(),
      onError: vi.fn(),
      onDismiss
    });

    (window.Razorpay as any).mock.instances[0].options.modal.ondismiss();
    expect(onDismiss).toHaveBeenCalled();
  });
});
