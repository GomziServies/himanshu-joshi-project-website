import React from 'react';
import { Bell } from '../layout/Ornaments';

const MANTRAS = ['ॐ नमः शिवाय', 'हर हर महादेव', 'जय सलाहकारेश्वर', 'बोल बम'];

/** Slowly moving band of mantras under the hero. */
export const MantraBand: React.FC = () => {
  const run = Array.from({ length: 6 }, () => MANTRAS).flat();
  return (
    <div className="overflow-hidden bg-sindoor-700 py-3" aria-hidden="true">
      <div lang="hi" className="mantra-track flex w-max font-deva text-xl text-brass-300">
        {[...run, ...run].map((mantra, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6">{mantra}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-marigold-500" />
          </span>
        ))}
      </div>
    </div>
  );
};

const STEPS = [
  {
    numeral: '१',
    title: 'Share your details',
    text: 'Your name, mobile number and email.'
  },
  {
    numeral: '२',
    title: 'Offer securely',
    text: 'Pay by UPI, card or net banking through Razorpay.'
  },
  {
    numeral: '३',
    title: 'Receive your blessing',
    text: 'Your receipt comes by email and your sankalp is taken at the temple.'
  }
];

export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="bg-ivory-100 px-4 py-16 sm:px-6 sm:py-24">
    <div className="mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <p lang="hi" className="font-deva text-lg text-marigold-600">विधि</p>
        <h2 className="mt-1 font-title text-4xl text-ink sm:text-5xl">How it works</h2>
      </div>
      <ol className="grid gap-8 sm:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.numeral}
            className="rounded-t-[8rem] rounded-b-2xl border border-brass-400/60 bg-white px-6 pb-8 pt-10 text-center shadow-sm"
          >
            <span lang="hi" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sanctum font-deva text-3xl text-brass-300">
              {step.numeral}
            </span>
            <h3 className="mt-5 font-title text-2xl text-ink">{step.title}</h3>
            <p className="mt-2 text-lg leading-relaxed text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/** First verse of the Lingashtakam, between hanging temple bells. */
export const VerseSection: React.FC = () => (
  <section className="jaali relative overflow-hidden bg-sindoor-700 px-4 py-20 text-center sm:px-6">
    <Bell className="absolute left-[3%] top-0 h-28 w-12 sm:h-40 sm:w-[4.5rem] lg:left-[8%]" />
    <Bell className="absolute right-[3%] top-0 h-28 w-12 sm:h-40 sm:w-[4.5rem] lg:right-[8%]" />
    <div className="relative mx-auto max-w-3xl">
      <p className="text-sm uppercase tracking-[0.3em] text-brass-400">Lingashtakam</p>
      <blockquote lang="hi" className="brass-text mt-6 px-8 pb-2 font-deva text-2xl leading-[1.7] sm:px-0 sm:text-4xl sm:leading-[1.6]">
        ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम् ।<br />
        जन्मजदुःखविनाशकलिङ्गं तत् प्रणमामि सदाशिवलिङ्गम् ॥
      </blockquote>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory-100/85">
        I bow to that Sadashiva Lingam, worshipped by Brahma, Vishnu and the devas, pure and radiant, which ends the sorrow of birth.
      </p>
    </div>
  </section>
);
