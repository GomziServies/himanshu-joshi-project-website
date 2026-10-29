import React, { useState, useEffect } from 'react';
import { ProductOffering, OfferingTier, DevoteeCustomer, VerifyPaymentResponse } from './types/api';
import { fetchOfferings } from './services/offeringService';
import { initiateRazorpayCheckout } from './services/checkoutService';
import { SEED_OFFERINGS } from './data/seedOfferings';
import { TopBar } from './components/layout/TopBar';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/layout/HeroBanner';
import { Footer } from './components/layout/Footer';
import { ShivlingSthapanaShowcase } from './components/offerings/ShivlingSthapanaShowcase';
import { OfferingsCatalog } from './components/offerings/OfferingsCatalog';
import { PrasadBoxVisualizer } from './components/offerings/PrasadBoxVisualizer';
import { SankalpDrawer } from './components/sankalp/SankalpDrawer';
import { SacredReceiptModal } from './components/receipt/SacredReceiptModal';
import { ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [offerings, setOfferings] = useState<ProductOffering[]>(SEED_OFFERINGS);
  const [selectedOffering, setSelectedOffering] = useState<ProductOffering | null>(null);
  const [selectedTier, setSelectedTier] = useState<OfferingTier | undefined>(undefined);
  const [isPrasadBoxOpen, setIsPrasadBoxOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [receiptModalData, setReceiptModalData] = useState<{
    receipt: VerifyPaymentResponse;
    devotee: DevoteeCustomer;
    offering: ProductOffering;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchOfferings().then((res) => {
      if (mounted && res && res.data && res.data.length > 0) {
        setOfferings(res.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const flagshipOffering =
    offerings.find((p) => p.slug === 'shivling-sthapana') || offerings[0] || SEED_OFFERINGS[0];

  const handleOpenBooking = (offering?: ProductOffering, tier?: OfferingTier) => {
    setSelectedOffering(offering || flagshipOffering);
    setSelectedTier(tier);
  };

  const handleBannerCta = (link?: string) => {
    if (link && link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    handleOpenBooking(flagshipOffering);
  };

  const handleSankalpSubmit = async (customer: DevoteeCustomer) => {
    if (!selectedOffering) return;
    setIsCheckoutLoading(true);

    await initiateRazorpayCheckout({
      request: {
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          sankalpName: customer.sankalpName,
          gotra: customer.gotra,
          nakshatra: customer.nakshatra,
          rashi: customer.rashi,
          prayerIntention: customer.prayerIntention,
          address: customer.address
        },
        items: [
          {
            productId: selectedOffering._id,
            quantity: 1,
            tierId: selectedTier?.id
          }
        ]
      },
      offering: selectedOffering,
      onSuccess: (receipt) => {
        setIsCheckoutLoading(false);
        const bookedOffering = selectedOffering;
        setSelectedOffering(null);
        setReceiptModalData({
          receipt,
          devotee: customer,
          offering: bookedOffering
        });
      },
      onError: (err) => {
        setIsCheckoutLoading(false);
        alert(`Payment error: ${err.message}`);
      },
      onDismiss: () => {
        setIsCheckoutLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-stone-900 selection:bg-saffron-500 selection:text-white">
      {/* Top Auspicious Announcement & Panchang Bar */}
      <TopBar />

      {/* Main Temple Header / Navbar */}
      <Navbar onSelectOfferingClick={() => handleOpenBooking(flagshipOffering)} />

      {/* Main Body */}
      <main className="flex-1">
        {/* Dynamic Hero Banner Carousel */}
        <HeroBanner onCtaClick={handleBannerCta} />

        {/* Flagship Shivling Sthapana Consecration Showcase */}
        {flagshipOffering && (
          <ShivlingSthapanaShowcase
            product={flagshipOffering}
            onBookNow={(prod, tier) => handleOpenBooking(prod, tier)}
            onViewPrasadBox={() => setIsPrasadBoxOpen(true)}
          />
        )}

        {/* Vedic Vidhi & Sanctum Process */}
        <section id="vedic-vidhi" className="py-20 bg-[#FDF8EC] border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-serif uppercase tracking-widest text-saffron-600 font-bold">
                Authentic Vedic Agamic Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-maroon-700">
                How Your Consecration Seva is Performed
              </h2>
              <p className="text-stone-600 text-sm">
                From the sanctified banks of the holy Narmada River to your sacred home mandir, every step is performed with devotion and Vedic precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Gotra Sankalp Invocation',
                  desc: 'Your name, Gotra, and sacred intentions are chanted by Vedic priests before commencing the Puja.'
                },
                {
                  step: '02',
                  title: 'Swayambhu Lingam Consecration',
                  desc: 'The naturally rounded Narmada stone undergoes sacred Pran Pratishtha with Panchamrit Snan.'
                },
                {
                  step: '03',
                  title: '108 Bilva Patra Archana',
                  desc: 'Priests chant Sri Rudram Namakam-Chamakam while offering fresh Bilva leaves onto the Shiva Lingam.'
                },
                {
                  step: '04',
                  title: 'Sanctified Prasad Delivery',
                  desc: 'The energized Shivling, Gangajal, and holy Bhasma are packed in a consecrated box and dispatched to you.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gold-500/30 shadow-sm relative">
                  <span className="font-serif text-4xl font-black text-gold-500/25 block mb-2">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Offerings Catalog */}
        <OfferingsCatalog
          products={offerings}
          onSelectProduct={(item) => handleOpenBooking(item)}
        />

        {/* Trust & Guarantee Banner */}
        <section id="trust-guarantee" className="py-16 bg-stone-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-300 uppercase tracking-wider">
                    Authentic Swayambhu Stone
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Every Narmadeshwar Shivling is personally sourced from the sacred Narmada River bed.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-300 uppercase tracking-wider">
                    Vedic Agamic Vidhi
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Consecrations are performed by Vedic Acharyas with full Gotra Sankalp and authentic rituals.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-300 uppercase tracking-wider">
                    Instant Trust Receipt
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Automated email receipts and live tracking details sent directly upon payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Temple Trust Footer */}
      <Footer />

      {/* Prasad Box Visualizer Modal */}
      <PrasadBoxVisualizer
        isOpen={isPrasadBoxOpen}
        onClose={() => setIsPrasadBoxOpen(false)}
      />

      {/* Devotee Sankalp Drawer */}
      {selectedOffering && (
        <SankalpDrawer
          offering={selectedOffering}
          selectedTier={selectedTier}
          isOpen={Boolean(selectedOffering)}
          onClose={() => setSelectedOffering(null)}
          onSubmit={handleSankalpSubmit}
          isLoading={isCheckoutLoading}
        />
      )}

      {/* Sacred Payment Confirmation Receipt Modal */}
      {receiptModalData && (
        <SacredReceiptModal
          isOpen={Boolean(receiptModalData)}
          onClose={() => setReceiptModalData(null)}
          receiptData={receiptModalData.receipt}
          devotee={receiptModalData.devotee}
          offering={receiptModalData.offering}
        />
      )}
    </div>
  );
};

export default App;
