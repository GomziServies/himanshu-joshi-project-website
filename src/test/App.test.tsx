import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import App from '../App';

const SHIVLING = {
  _id: 'product_1',
  title: 'Salahkareshwar Mahadev Shivling',
  slug: 'salahkareshwar-shivling',
  category: 'Offering',
  subtitle: 'श्री सलाहकारेश्वर महादेव शिवलिंग',
  description: 'A Shivling blessed at the temple.',
  price: 501,
  images: ['/salahkareshwar-shivling.jpg'],
  featuredImage: '/salahkareshwar-shivling.jpg',
  isActive: true,
  prasadIncludes: ['Shivling blessed at the temple']
};

function product(n: number, price = 100 * n) {
  return { ...SHIVLING, _id: `product_${n}`, slug: `shivling-${n}`, title: `Shivling ${n}`, subtitle: undefined, price };
}

const ORDER_RESPONSE = {
  success: true,
  orderId: 'order_1',
  orderNumber: 'ORD-1',
  razorpayOrderId: 'order_demo_1',
  amount: 150300,
  currency: 'INR',
  key: 'k',
  isDemo: true
};

function mockApi(products: object[]) {
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    let body: unknown = { success: true, data: products };
    if (url.includes('/orders/create-order')) body = ORDER_RESPONSE;
    if (url.includes('/orders/verify-payment')) {
      body = { success: true, message: 'ok', orderId: 'order_1', orderNumber: 'ORD-1', receiptNumber: 'RCPT-1', amount: 1503 };
    }
    return { ok: true, status: 200, headers: { get: () => 'application/json' }, json: async () => body, init };
  });
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
}

function orderBody(fetchMock: ReturnType<typeof mockApi>) {
  const call = fetchMock.mock.calls.find(([url]) => url.includes('/orders/create-order'));
  return JSON.parse(String(call?.[1]?.body));
}

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

function fillCheckoutForm() {
  const fill = (label: RegExp, value: string) =>
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fill(/Full name/i, 'Amit Sharma');
  fill(/Mobile number/i, '9876543210');
  fill(/Email/i, 'amit@example.com');
  fill(/House and street/i, '12 Shiv Nagar');
  fill(/City/i, 'Vadodara');
  fill(/PIN code/i, '390012');
  fill(/State/i, 'Gujarat');
}

beforeEach(() => {
  localStorage.clear();
  Element.prototype.scrollIntoView = vi.fn();
});

describe('Home page', () => {
  it('shows the temple name and the price from the database', async () => {
    mockApi([SHIVLING]);
    renderAt('/');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('श्री सलाहकारेश्वर महादेव');
    expect(await screen.findByTestId('hero-price')).toHaveTextContent('₹501');
    expect(screen.getByRole('heading', { name: SHIVLING.title })).toBeInTheDocument();
  });

  it('uses a temple heading, not shop wording', async () => {
    mockApi([SHIVLING, product(2)]);
    renderAt('/');
    await screen.findByTestId('hero-price');

    expect(screen.getByRole('heading', { name: 'पावन अर्पण' })).toBeInTheDocument();
    expect(screen.queryByText(/Choose your/i)).not.toBeInTheDocument();
  });

  it('uses whatever price the admin has set', async () => {
    mockApi([{ ...SHIVLING, price: 1100 }]);
    renderAt('/');

    expect(await screen.findByTestId('hero-price')).toHaveTextContent('₹1,100');
    expect(screen.queryByText(/₹501/)).not.toBeInTheDocument();
  });

  it('shows only four products, with View all going to the Shop page', async () => {
    mockApi([1, 2, 3, 4, 5, 6].map((n) => product(n)));
    renderAt('/');

    await screen.findByRole('heading', { name: 'Shivling 1' });
    expect(screen.getByRole('heading', { name: 'Shivling 4' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Shivling 5' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'View all' }));

    expect(await screen.findByRole('heading', { name: 'Shivling 6' })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/shop');
  });

  it('shows the lowest price and scrolls to the offerings when there are several', async () => {
    mockApi([SHIVLING, product(2, 251)]);
    renderAt('/');

    expect(await screen.findByTestId('hero-price')).toHaveTextContent('₹251');
    expect(screen.getAllByText('From').length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByRole('button', { name: 'View offerings' })[0]);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('goes to the product page from the hero when there is one product', async () => {
    mockApi([SHIVLING]);
    renderAt('/');
    await screen.findByTestId('hero-price');

    fireEvent.click(screen.getAllByRole('button', { name: /Offer for your Shivling/ })[0]);

    expect(await screen.findByRole('heading', { level: 1, name: SHIVLING.title })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/product/salahkareshwar-shivling');
  });

  it('shows a retry and no price when the API is down, then recovers', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    renderAt('/');

    expect(await screen.findByText(/could not reach the temple office/i)).toBeInTheDocument();
    expect(screen.queryByTestId('hero-price')).not.toBeInTheDocument();

    mockApi([SHIVLING]);
    fireEvent.click(screen.getByRole('button', { name: /Try again/i }));

    expect(await screen.findByTestId('hero-price')).toHaveTextContent('₹501');
    await waitFor(() => expect(screen.queryByText(/could not reach/i)).not.toBeInTheDocument());
    consoleError.mockRestore();
  });

  it('says so when no products are on sale', async () => {
    mockApi([]);
    renderAt('/');

    expect(await screen.findByText(/Offerings are not open right now/i)).toBeInTheDocument();
    expect(screen.queryByTestId('hero-price')).not.toBeInTheDocument();
  });

  it('shows the temple contact and bank details in the footer', async () => {
    mockApi([SHIVLING]);
    renderAt('/');
    await screen.findByTestId('hero-price');

    expect(screen.getByText('ABETS6872M')).toBeInTheDocument();
    expect(screen.getByText('UDYAM-GJ-24-0064289')).toBeInTheDocument();
    expect(screen.getByText(/Gotri Sevasi Road, New Alkapuri, Vadodara/)).toBeInTheDocument();
    expect(screen.getByText(/Kotak Mahindra Bank/)).toBeInTheDocument();
    expect(screen.getByText('Salahkareshwar@kotak')).toBeInTheDocument();
    expect(screen.getByText('+91 98256 00778')).toBeInTheDocument();
  });
});

describe('Shop page', () => {
  it('shows every product and asks the API for all of them', async () => {
    const fetchMock = mockApi([1, 2, 3, 4, 5, 6, 7].map((n) => product(n)));
    renderAt('/shop');

    expect(await screen.findByRole('heading', { name: 'Shivling 7' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(7);
    expect(fetchMock.mock.calls[0][0]).toContain('limit=100');
  });

  it('adds to the cart from a card and updates the count', async () => {
    mockApi([product(1), product(2)]);
    renderAt('/shop');

    fireEvent.click(await screen.findByRole('button', { name: 'Add Shivling 1 to cart' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByRole('link', { name: 'Cart, 1 item' })).toBeInTheDocument();
  });

  it('opens the product page from a card', async () => {
    mockApi([product(1), product(2)]);
    renderAt('/shop');

    fireEvent.click(await screen.findByRole('link', { name: 'Shivling 2' }));

    expect(await screen.findByRole('heading', { level: 1, name: 'Shivling 2' })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/product/shivling-2');
  });
});

describe('Product page', () => {
  it('changes the total with the quantity and stops at the limits', async () => {
    mockApi([SHIVLING]);
    renderAt('/product/salahkareshwar-shivling');

    const decrease = await screen.findByRole('button', { name: 'Decrease quantity' });
    const increase = screen.getByRole('button', { name: 'Increase quantity' });
    expect(decrease).toBeDisabled();

    fireEvent.click(increase);
    fireEvent.click(increase);
    expect(screen.getByTestId('line-total')).toHaveTextContent('₹1,503');
    expect(screen.getByTestId('unit-price')).toHaveTextContent('₹501');

    for (let i = 0; i < 30; i++) fireEvent.click(increase);
    expect(increase).toBeDisabled();
    expect(screen.getByTestId('line-total')).toHaveTextContent('₹10,020');
  });

  it('adds the chosen quantity to the cart', async () => {
    mockApi([SHIVLING]);
    renderAt('/product/salahkareshwar-shivling');

    fireEvent.click(await screen.findByRole('button', { name: 'Increase quantity' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByRole('link', { name: 'View your cart' })).toHaveAttribute('href', '/cart');
  });

  it('pays directly with the chosen quantity and leaves the cart alone', async () => {
    const fetchMock = mockApi([SHIVLING, product(2)]);
    renderAt('/product/salahkareshwar-shivling');

    const increase = await screen.findByRole('button', { name: 'Increase quantity' });
    fireEvent.click(increase);
    fireEvent.click(increase);
    fireEvent.click(screen.getByRole('button', { name: 'Add Shivling 2 to cart' }));
    fireEvent.click(screen.getByRole('button', { name: 'Offer now' }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('button', { name: /Pay ₹1,503/ })).toBeInTheDocument();

    fillCheckoutForm();
    fireEvent.click(within(dialog).getByRole('button', { name: /Pay ₹1,503/ }));
    fireEvent.click(await screen.findByRole('button', { name: 'Complete test payment' }));

    expect(await screen.findByText('Your offering is received')).toBeInTheDocument();
    expect(orderBody(fetchMock).items).toEqual([{ productId: SHIVLING._id, quantity: 3 }]);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  it('says so for a product that does not exist', async () => {
    mockApi([SHIVLING]);
    renderAt('/product/not-a-real-product');

    expect(await screen.findByText('This offering is not available')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'See all offerings' })).toHaveAttribute('href', '/shop');
  });
});

describe('Cart page', () => {
  it('shows an empty state', async () => {
    mockApi([SHIVLING]);
    renderAt('/cart');

    expect(await screen.findByText('Your cart is empty')).toBeInTheDocument();
  });

  it('changes quantities, removes items and keeps the total right', async () => {
    localStorage.setItem('temple_cart', JSON.stringify([
      { productId: 'product_1', quantity: 2 },
      { productId: 'product_2', quantity: 1 }
    ]));
    mockApi([product(1, 501), product(2, 251)]);
    renderAt('/cart');

    expect(await screen.findByTestId('cart-total')).toHaveTextContent('₹1,253');

    const secondLine = screen.getByRole('group', { name: 'Quantity of Shivling 2' });
    fireEvent.click(within(secondLine).getByRole('button', { name: 'Increase quantity' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₹1,504');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('4');

    fireEvent.click(screen.getByRole('button', { name: 'Remove Shivling 1' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₹502');
    expect(JSON.parse(localStorage.getItem('temple_cart')!)).toEqual([{ productId: 'product_2', quantity: 2 }]);
  });

  it('uses the current price, not one from when it was added', async () => {
    localStorage.setItem('temple_cart', JSON.stringify([{ productId: 'product_1', quantity: 1, price: 1 }]));
    mockApi([product(1, 701)]);
    renderAt('/cart');

    expect(await screen.findByTestId('cart-total')).toHaveTextContent('₹701');
  });

  it('removes a product that is no longer on sale and says so', async () => {
    localStorage.setItem('temple_cart', JSON.stringify([
      { productId: 'gone', quantity: 1 },
      { productId: 'product_1', quantity: 1 }
    ]));
    mockApi([product(1, 501)]);
    renderAt('/cart');

    expect(await screen.findByText(/no longer available/)).toBeInTheDocument();
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₹501');
    expect(JSON.parse(localStorage.getItem('temple_cart')!)).toEqual([{ productId: 'product_1', quantity: 1 }]);
  });

  it('keeps the cart when the API is down', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('temple_cart', JSON.stringify([{ productId: 'product_1', quantity: 3 }]));
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    renderAt('/cart');

    expect(await screen.findByText(/could not reach the temple office/i)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('temple_cart')!)).toEqual([{ productId: 'product_1', quantity: 3 }]);
    consoleError.mockRestore();
  });

  it('survives a corrupted saved cart', async () => {
    localStorage.setItem('temple_cart', '{not json');
    mockApi([SHIVLING]);
    renderAt('/cart');

    expect(await screen.findByText('Your cart is empty')).toBeInTheDocument();
  });

  it('pays for everything together and empties the cart afterwards', async () => {
    localStorage.setItem('temple_cart', JSON.stringify([
      { productId: 'product_1', quantity: 2 },
      { productId: 'product_2', quantity: 1 }
    ]));
    const fetchMock = mockApi([product(1, 501), product(2, 251)]);
    renderAt('/cart');

    fireEvent.click(await screen.findByRole('button', { name: 'Proceed to pay' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: '3 offerings' })).toBeInTheDocument();

    fillCheckoutForm();
    fireEvent.click(within(dialog).getByRole('button', { name: /Pay ₹1,253/ }));
    fireEvent.click(await screen.findByRole('button', { name: 'Complete test payment' }));

    expect(await screen.findByText('Your offering is received')).toBeInTheDocument();
    expect(orderBody(fetchMock).items).toEqual([
      { productId: 'product_1', quantity: 2 },
      { productId: 'product_2', quantity: 1 }
    ]);
    expect(screen.getByText('Shivling 1 × 2')).toBeInTheDocument();
    expect(screen.getByText('Shivling 2 × 1')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('temple_cart')!)).toEqual([]);
    expect(screen.queryByTestId('cart-count')).not.toBeInTheDocument();
  });

  it('keeps the cart when the payment is cancelled', async () => {
    localStorage.setItem('temple_cart', JSON.stringify([{ productId: 'product_1', quantity: 2 }]));
    mockApi([product(1, 501)]);
    renderAt('/cart');

    fireEvent.click(await screen.findByRole('button', { name: 'Proceed to pay' }));
    fillCheckoutForm();
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Pay ₹1,002/ }));
    fireEvent.click(await screen.findByRole('button', { name: 'Cancel' }));

    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
  });
});
