'use client';
import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const scope = (document?.baseURI && new URL(document.baseURI).pathname.replace(/\/$/, '')) || '';
      const swUrl = `${scope}/sw.js`; // resolves to '/sw.js' locally and '/joiascortantes/sw.js' in Pages
      navigator.serviceWorker.register(swUrl).catch(console.warn);
    }
  }, []);
  return null;
}
