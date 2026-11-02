import React, { useState } from 'react';
import { Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { TempleSkyline } from './Ornaments';

const BANK_DETAILS = [
  { label: 'Current A/c', value: '2847327173' },
  { label: 'IFSC', value: 'KKBK0002747' },
  { label: 'UPI', value: 'Salahkareshwar@kotak' }
];

const CopyRow: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-brass-500/15 py-2 last:border-0">
      <span className="text-ivory-200/70">{label}</span>
      <button
        type="button"
        onClick={copy}
        className="flex min-w-0 items-center gap-1.5 text-brass-300 hover:text-brass-200"
        aria-label={`Copy ${label}`}
      >
        <span className="truncate">{value}</span>
        {copied ? <Check className="h-4 w-4 shrink-0" /> : <Copy className="h-4 w-4 shrink-0 opacity-60" />}
      </button>
    </div>
  );
};

export const Footer: React.FC = () => (
  <footer id="contact" className="bg-ivory-100">
    <TempleSkyline className="h-20 pt-4 sm:h-36 lg:h-48" />
    <div className="jaali bg-sanctum-800 px-4 pb-24 pt-10 text-ivory-100 sm:px-6 lg:pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src="/punya-passport-logo.jpg" alt="" className="h-12 w-12 rounded-full border border-brass-500 object-cover" />
            <div>
              <p lang="hi" className="font-deva text-xl text-brass-300">श्री सलाहकारेश्वर महादेव तीर्थ</p>
              <p className="text-sm text-ivory-200/70">Salahkareshwar Mahadev Tirth · पुण्य पासपोर्ट</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-ivory-200/70">
            e-PAN: <span className="text-ivory-100">ABETS6872M</span>
            <br />
            Udyam: <span className="text-ivory-100">UDYAM-GJ-24-0064289</span>
          </p>
        </div>

        <div>
          <h2 className="font-title text-xl text-brass-300">Contact the temple</h2>
          <ul className="mt-4 space-y-3 text-ivory-100/90">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-marigold-400" />
              <span>408, Souvenir Flats, Opp GreenField Bungalows, Laxmipura, Gotri Sevasi Road, New Alkapuri, Vadodara, Gujarat - 390012</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-marigold-400" />
              <a href="tel:+919825600778" className="hover:text-brass-300">+91 98256 00778</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-marigold-400" />
              <a href="mailto:himanshu@meratrainer.com" className="break-all hover:text-brass-300">himanshu@meratrainer.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-title text-xl text-brass-300">Bank details</h2>
          <p className="mt-1 text-sm text-ivory-200/70">Kotak Mahindra Bank, Gotri Branch, Vadodara</p>
          <div className="mt-3">
            {BANK_DETAILS.map((row) => (
              <CopyRow key={row.label} {...row} />
            ))}
          </div>
        </div>
      </div>

      <p lang="hi" className="mx-auto mt-10 max-w-6xl border-t border-brass-500/15 pt-5 text-center text-sm text-ivory-200/60">
        ॐ सर्वे भवन्तु सुखिनः · © {new Date().getFullYear()} श्री सलाहकारेश्वर महादेव तीर्थ
      </p>
    </div>
  </footer>
);

export default Footer;
