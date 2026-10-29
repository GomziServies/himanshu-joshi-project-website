/**
 * src/services/razorpayLoader.ts
 * Dynamically injects checkout.js with duplicate guard, timeout, and ad-blocker error handling.
 */

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
const SCRIPT_ELEMENT_ID = 'razorpay-checkout-sdk';

let loadPromise: Promise<boolean> | null = null;

export function loadRazorpayScript(timeoutMs = 8000): Promise<boolean> {
  // If window.Razorpay is already present, resolve immediately
  if (typeof window !== 'undefined' && typeof window.Razorpay === 'function') {
    return Promise.resolve(true);
  }

  // Return existing in-flight promise if loading
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise<boolean>((resolve, reject) => {
    if (typeof document === 'undefined') {
      return reject(new Error('Razorpay SDK can only be loaded in a browser environment.'));
    }

    // Check if script tag already exists in DOM
    const existingScript = document.getElementById(SCRIPT_ELEMENT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => {
        loadPromise = null;
        reject(new Error('Failed to load Razorpay payment gateway script.'));
      });
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ELEMENT_ID;
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;

    const timer = setTimeout(() => {
      loadPromise = null;
      reject(new Error('Razorpay gateway script loading timed out. Please check your internet connection.'));
    }, timeoutMs);

    script.onload = () => {
      clearTimeout(timer);
      resolve(true);
    };

    script.onerror = () => {
      clearTimeout(timer);
      loadPromise = null;
      reject(
        new Error(
          'Payment gateway script was blocked by browser privacy settings or an ad-blocker. Please disable ad-blockers and try again.'
        )
      );
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}
