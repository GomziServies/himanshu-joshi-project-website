import React, { useEffect, useMemo, useRef } from 'react';
import { Printer } from 'lucide-react';
import { CheckoutLine, DevoteeCustomer, VerifyPaymentResponse } from '../../types/api';
import { Diya } from '../layout/Ornaments';

interface SacredReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: VerifyPaymentResponse;
  devotee: DevoteeCustomer;
  lines: CheckoutLine[];
}

/** Marigold petals drifting down behind the slip. Decorative only, never printed. */
const PetalFall: React.FC = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 7.3 + 4) % 96}%`,
        size: 7 + ((i * 5) % 9),
        color: i % 3 === 0 ? '#F7A928' : i % 3 === 1 ? '#EE8F12' : '#D27408',
        dur: `${7.5 + ((i * 1.7) % 6)}s`,
        delay: `${(i * 0.73) % 7}s`,
        drift: `${((i % 5) - 2) * 34}px`,
        spin: `${300 + ((i * 97) % 420)}deg`
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden print-hide" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={
            {
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.35,
              background: petal.color,
              '--dur': petal.dur,
              '--delay': petal.delay,
              '--drift': petal.drift,
              '--spin': petal.spin
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

/** One printed line of the slip, with a dotted leader joining label to value. */
const Row: React.FC<{ label: string; value: React.ReactNode; index: number }> = ({
  label,
  value,
  index
}) => (
  <div
    className="parchi-row flex items-end justify-between py-[7px]"
    style={{ animationDelay: `${0.26 + index * 0.075}s` }}
  >
    <dt className="shrink-0 text-[13px] uppercase tracking-[0.14em] text-ink-muted">{label}</dt>
    <span className="leader" aria-hidden="true" />
    <dd className="max-w-[62%] text-right font-medium leading-snug text-ink">{value}</dd>
  </div>
);

/** Round temple seal, pressed onto the paper once the slip has settled. */
const TempleSeal: React.FC<{ date: string }> = ({ date }) => (
  <svg className="parchi-seal h-24 w-24 shrink-0" viewBox="0 0 120 120" aria-hidden="true">
    <defs>
      <path id="seal-arc-top" d="M60,60 m-42,0 a42,42 0 1,1 84,0" fill="none" />
      <path id="seal-arc-bottom" d="M60,60 m42,0 a42,42 0 1,1 -84,0" fill="none" />
    </defs>
    <g fill="none" stroke="#8F1C16" strokeWidth="2">
      <circle cx="60" cy="60" r="55" />
      <circle cx="60" cy="60" r="49" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="31" strokeWidth="1.3" />
    </g>
    <text fill="#8F1C16" fontSize="10" letterSpacing="1.9" fontFamily="Marcellus, Georgia, serif">
      <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
        SALAHKARESHWAR MAHADEV
      </textPath>
    </text>
    <text fill="#8F1C16" fontSize="9" letterSpacing="2.4" fontFamily="Marcellus, Georgia, serif">
      <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
        GOTRI · VADODARA
      </textPath>
    </text>
    {/* Trishul at the centre of the seal */}
    <g stroke="#8F1C16" strokeWidth="2.4" strokeLinecap="round" fill="none">
      <path d="M60 36 L60 82" />
      <path d="M49 54 C49 46 52 42 52 38 C55 43 55 49 55 54" />
      <path d="M71 54 C71 46 68 42 68 38 C65 43 65 49 65 54" />
      <path d="M49 54 L71 54" />
      <path d="M56 42 L64 42" />
    </g>
    <text
      x="60"
      y="95"
      textAnchor="middle"
      fill="#8F1C16"
      fontSize="8.5"
      letterSpacing="1"
      fontFamily="Marcellus, Georgia, serif"
    >
      {date}
    </text>
  </svg>
);

export const SacredReceiptModal: React.FC<SacredReceiptModalProps> = ({
  isOpen,
  onClose,
  receiptData,
  devotee,
  lines
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, and hold the page still behind the slip while it is open
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const now = new Date();
  const issuedOn = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const sealDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  let rowIndex = 0;
  const nextIndex = () => rowIndex++;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-sanctum/85 backdrop-blur-sm">
      <PetalFall />

      <div className="relative flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="receipt-title"
          className="parchi-in my-8 w-full max-w-md"
        >
          {/* The slip itself: everything inside this element is what gets printed */}
          <div
            className="print-area relative overflow-hidden rounded-[18px] bg-ivory-50 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 18% 12%, rgba(196,154,62,0.07), transparent 42%), radial-gradient(circle at 84% 78%, rgba(179,38,30,0.05), transparent 46%)'
            }}
          >
            {/* Header: the lamplit sanctum, with one sweep of light across the brass */}
            <div className="jaali parchi-shimmer relative overflow-hidden bg-sanctum px-6 pb-7 pt-6 text-center">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-32"
                style={{
                  background: 'radial-gradient(60% 100% at 50% 0%, rgba(251,194,82,0.22), transparent 70%)'
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <Diya className="mx-auto h-16 w-16" />
                <p lang="hi" className="mt-2 font-deva text-2xl text-marigold-400">
                  हर हर महादेव
                </p>
                <h2 id="receipt-title" className="brass-text mt-1 font-title text-[26px] leading-tight">
                  Your offering is received
                </h2>
                <p className="mx-auto mt-2 max-w-[18rem] text-sm leading-relaxed text-ivory-200/85">
                  Thank you, {devotee.name}. May Mahadev bless you and your family.
                </p>
              </div>

              {/* Brass rule with a diamond, closing the header */}
              <div className="relative mt-5 flex items-center justify-center gap-2" aria-hidden="true">
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-brass-500" />
                <span className="h-1.5 w-1.5 rotate-45 bg-brass-400" />
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-brass-500" />
              </div>
            </div>

            {/* Perforation: notches bitten out of both edges, with a tear line between */}
            <div className="relative h-6 bg-ivory-50" aria-hidden="true">
              <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-sanctum" />
              <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-sanctum" />
              <span className="absolute inset-x-5 top-1/2 border-t border-dashed border-brass-500/50" />
            </div>

            <div className="relative px-6 pb-6">
              {/* Om watermark under the printed lines */}
              <span
                lang="hi"
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-deva text-[11rem] leading-none text-brass-500/10"
              >
                ॐ
              </span>

              <div className="relative">
                <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-brass-600">
                  Prasad receipt · {issuedOn}
                </p>

                <dl className="divide-y divide-dashed divide-ivory-200">
                  <Row label="Receipt no." value={receiptData.receiptNumber} index={nextIndex()} />
                  <Row label="Order no." value={receiptData.orderNumber} index={nextIndex()} />
                  <Row
                    label="Offering"
                    index={nextIndex()}
                    value={lines.map((line) => (
                      <span key={line.product._id} className="block">
                        {line.product.title} × {line.quantity}
                      </span>
                    ))}
                  />
                </dl>

                {/* The amount, set apart on its own tablet */}
                <div
                  className="parchi-row mt-4 flex items-center justify-between rounded-xl border border-brass-500/40 bg-ivory-100 px-4 py-3"
                  style={{ animationDelay: `${0.26 + nextIndex() * 0.075}s` }}
                >
                  <span className="text-[13px] uppercase tracking-[0.14em] text-ink-muted">
                    Amount offered
                  </span>
                  <span className="font-title text-3xl text-sindoor-600">
                    ₹{receiptData.amount?.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* The seal, pressed beside the temple's details */}
                <div className="mt-5 flex items-end justify-between gap-4">
                  <p className="text-[13px] leading-relaxed text-ink-muted">
                    <span lang="hi" className="block font-deva text-base text-ink">
                      श्री सलाहकारेश्वर महादेव तीर्थ
                    </span>
                    Gotri, Vadodara
                    <br />
                    e-PAN ABETS6872M · +91 98256 00778
                  </p>
                  <TempleSeal date={sealDate} />
                </div>

                <p className="mt-4 border-t border-dashed border-ivory-200 pt-3 text-center text-[11px] leading-relaxed text-ink-muted">
                  This slip is your proof of offering. Please keep it for your records.
                </p>
              </div>
            </div>

            {/* Torn lower edge of the slip */}
            <div className="parchi-tear-bottom" aria-hidden="true" />
          </div>

          {/* Actions sit outside the slip, so they are never part of the print */}
          <div className="print-hide mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-brass-500/70 px-5 py-2.5 font-medium text-brass-200 transition hover:bg-brass-500/15"
            >
              <Printer className="h-4 w-4" />
              Print slip
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="btn-offer !px-7 !py-2.5 !text-base"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredReceiptModal;
