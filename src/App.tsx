import React, { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { ProductsProvider } from './context/ProductsContext';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ArchDefs } from './components/layout/Ornaments';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShopPage } from './pages/ShopPage';

/** Starts each new page at the top, or at the #section the link points to. */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView?.();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const NotFoundPage: React.FC = () => (
  <section className="px-4 py-20 text-center">
    <h1 className="font-title text-3xl text-ink">Page not found</h1>
    <Link to="/" className="btn-offer mt-6">Back to home</Link>
  </section>
);

export const App: React.FC = () => (
  <BrowserRouter>
    <ProductsProvider>
      <CartProvider>
        <CheckoutProvider>
          <ScrollManager />
          <ArchDefs />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CheckoutProvider>
      </CartProvider>
    </ProductsProvider>
  </BrowserRouter>
);

export default App;
