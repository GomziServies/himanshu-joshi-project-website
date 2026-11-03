import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DiyaRow, Toran } from './Ornaments';

interface HeroProps {
  price?: number;
  hasChoice?: boolean;
  actionLabel: string;
  onOffer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ price, hasChoice = false, actionLabel, onOffer }) => (
  <section id="top" className="jaali relative overflow-hidden bg-sanctum text-ivory-50">
    {/* The sanctum photo fades into the dark stone behind the text */}
    <div className="absolute inset-x-0 top-0 h-[26rem] sm:h-[30rem] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[62%]">
      <img
        src="/salahkareshwar-shivling.jpg"
        alt="Shivling with a bilva leaf, lamps and marigolds in the temple sanctum"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sanctum/40 via-transparent via-40% to-sanctum to-95% lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-sanctum via-sanctum/25 to-transparent lg:block" />
      <div className="absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-sanctum to-transparent lg:block" />
    </div>

    <Toran className="relative z-10 -mb-4" />

    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-[19rem] sm:px-6 sm:pt-96 lg:pb-16 lg:pt-14">
      <div className="max-w-xl">
        <p lang="hi" className="font-deva text-xl text-marigold-400 sm:text-2xl">
          ॥ ॐ नमः शिवाय ॥
        </p>
        {/* Gradient text paints only inside its box, so Devanagari marks need room above and below */}
        <h1 lang="hi" className="brass-text -mx-1 px-1 py-4 font-deva text-5xl leading-[1.35] sm:text-6xl lg:text-7xl">
          श्री सलाहकारेश्वर महादेव
        </h1>
        <p className="mt-4 font-title text-2xl leading-snug text-ivory-50 sm:text-3xl">
          Bring home a Shivling blessed at the temple
        </p>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-ivory-200/85">
          Your name is taken in the sankalp at Salahkareshwar Mahadev Tirth, Gotri, Vadodara.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          {price !== undefined && (
            <div>
              {hasChoice && <p className="mb-1 text-sm uppercase tracking-widest text-ivory-200/80">From</p>}
              <p className="brass-text font-sans text-6xl font-bold leading-none" data-testid="hero-price">
                ₹{price.toLocaleString('en-IN')}
              </p>
            </div>
          )}
          <button type="button" onClick={onOffer} className="btn-offer !px-8 !py-3.5 !text-xl">
            {actionLabel}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <DiyaRow count={9} className="relative z-10 pb-5" />
    <div className="relative z-10 h-1 bg-gradient-to-r from-transparent via-brass-500 to-transparent" />
  </section>
);

export default Hero;
