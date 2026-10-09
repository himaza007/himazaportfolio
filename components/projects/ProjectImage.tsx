'use client';

import Image from 'next/image';
import { useState } from 'react';

/** next/image that falls back to a crimson-glass placeholder if the file is missing. */
export function ProjectImage({
  src,
  alt,
  title,
  sizes,
  priority,
  className = '',
}: {
  src: string;
  alt: string;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <Placeholder title={title} />;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function Placeholder({ title }: { title: string }) {
  const initials = title
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w[0] ?? ''))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 30% 20%, rgba(139,0,0,0.45), transparent 60%), linear-gradient(135deg, #0d0d0d, #050505)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <span className="relative text-5xl font-black tracking-tight text-white/80">{initials}</span>
    </div>
  );
}
