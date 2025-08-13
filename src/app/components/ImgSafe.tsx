'use client';

import { useState } from 'react';

export default function ImgSafe({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) {
    return (
      <div
        className={className}
        style={{ background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 10px, rgba(255,255,255,0.09) 10px 20px)' }}
        aria-label={alt}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} onError={() => setOk(false)} />;
}
