# Salahkareshwar Mahadev Tirth: Website

Temple-themed site for offering a Shivling (₹501), built with React 18, Vite, TypeScript and Tailwind CSS.
n
Products and prices come only from the API, so whatever is set in the admin panel is what the site shows and charges. If the API cannot be reached, the page offers a retry instead of showing a price.

Payments go through Razorpay. While the API runs in demo mode (`DEMO_PAYMENT_ENABLED=true`) a clearly labelled test payment replaces Razorpay and no money moves.

## Getting Started
```bash
npm install
cp .env.example .env
npm run dev     # http://localhost:5173
npm run build
npm test
```

The API must be running.
