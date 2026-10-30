import React, { useState, useEffect } from 'react';
import { ProductOffering, OfferingTier, DevoteeCustomer, VerifyPaymentResponse } from './types/api';
import { fetchOfferings } from './services/offeringService';
import { initiateRazorpayCheckout } from './services/checkoutService';
import { SEED_OFFERINGS } from './data/seedOfferings';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ShivlingSthapanaShowcase } from './components/offerings/ShivlingSthapanaShowcase';
import { PrasadBoxVisualizer } from './components/offerings/PrasadBoxVisualizer';
import { SankalpDrawer } from './components/sankalp/SankalpDrawer';
import { SacredReceiptModal } from './components/receipt/SacredReceiptModal';
import { MandirShlokaSection } from './components/offerings/MandirShlokaSection';
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
      {/* Main Temple Header / Navbar */}
      <Navbar onSelectOfferingClick={() => handleOpenBooking(flagshipOffering)} />

      {/* Main Body */}
      <main className="flex-1">
        {/* Flagship Shivling Sthapana Consecration Showcase */}
        {flagshipOffering && (
          <ShivlingSthapanaShowcase
            product={flagshipOffering}
            onBookNow={(prod, tier) => handleOpenBooking(prod, tier)}
            onViewPrasadBox={() => setIsPrasadBoxOpen(true)}
          />
        )}

        {/* Sacred Vedic Shlokas & Narmada Lingam Significance */}
        <MandirShlokaSection />

        {/* Vedic Vidhi & Sanctum Process */}
        <section id="vedic-vidhi" className="py-24 bg-[#F7F1E5] border-b-2 border-[#D4AF37]/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6D071A] to-[#8B0000] border border-[#D4AF37] text-[#FFE885] text-xs font-serif font-black uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7722]" />
                <span>॥ षोडशोपचार वैदिक प्रतिष्ठा क्रम ॥</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#6D071A] tracking-wide">
                How Your Consecration Seva is Performed
              </h2>
              <p className="text-stone-700 text-sm sm:text-base font-serif leading-relaxed">
                From the sanctified altar of Sri Salahkareshwar Mahadev Tirth to your home mandir, every step is performed with devotion, Vedic purity, and Agamic precision.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '०१',
                  sub: 'Step 01',
                  title: 'Gotra Sankalp Invocation',
                  desc: 'Your name, Gotra, and sacred intentions are explicitly chanted by initiated Vedic priests at the sacred sanctum altar.'
                },
                {
                  step: '०२',
                  sub: 'Step 02',
                  title: 'Swayambhu Consecration',
                  desc: 'The sacred Swayambhu Shivling undergoes Agamic Pran Pratishtha with Panchamrit Snan and sanctified Gangajal.'
                },
                {
                  step: '०३',
                  sub: 'Step 03',
                  title: '108 Bilva Patra Archana',
                  desc: 'Priests chant Sri Rudram Namakam-Chamakam while offering fresh 108 consecrated Bilva leaves onto the Shiva Lingam.'
                },
                {
                  step: '०४',
                  sub: 'Step 04',
                  title: 'Sanctified Prasad Delivery',
                  desc: 'The energized Shivling, Gangajal, and holy Bhasma are packed in a velvet consecrated box and dispatched via Speed Post.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-7 border-2 border-[#D4AF37]/40 shadow-lg relative group hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-black text-[#C2410C]">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-serif uppercase tracking-widest px-2 py-0.5 rounded bg-[#FAF4EB] text-stone-600 font-bold border border-[#D4AF37]/30">
                      {item.sub}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-black text-[#1F1510] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                    Swayambhu Sanctum Shivling
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Every Shivling is energized and consecrated directly at Sri Salahkareshwar Mahadev Tirth.
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
