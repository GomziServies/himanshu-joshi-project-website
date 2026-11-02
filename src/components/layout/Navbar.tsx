import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-brass-300 ${isActive ? 'text-brass-300' : ''}`;

export const Navbar: React.FC = () => {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-brass-500/25 bg-sanctum/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src="/punya-passport-logo.jpg" alt="" className="h-10 w-10 shrink-0 rounded-full border border-brass-500 object-cover" />
          <span className="min-w-0 leading-tight">
            <span lang="hi" className="block font-deva text-base leading-snug text-brass-300 sm:text-lg">
              सलाहकारेश्वर महादेव तीर्थ
            </span>
            <span className="hidden truncate text-xs tracking-wide text-ivory-200/70 sm:block">
              Salahkareshwar Mahadev Tirth
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-ivory-100/85 md:flex" aria-label="Main">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
          <Link to="/#how-it-works" className="transition-colors hover:text-brass-300">How it works</Link>
          <a href="#contact" className="transition-colors hover:text-brass-300">Contact</a>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <NavLink to="/shop" className={(state) => `${navLinkClass(state)} px-1 text-ivory-100/90 md:hidden`}>Shop</NavLink>
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-brass-300 transition-colors hover:bg-white/10"
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <ShoppingCart className="h-6 w-6" />
            {count > 0 && (
              <span data-testid="cart-count" className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-marigold-500 px-1 text-xs font-bold text-sanctum">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
