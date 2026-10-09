'use client';

import type { ReactNode } from 'react';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  kicker?: string;
}

export function SectionHeading({ index, label, title, kicker }: SectionHeadingProps) {
  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
        <span className="h-px w-8 bg-[#99E1D9]" />
        <span>
          {index} / {label}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {kicker && (
        <p className="mt-2 font-mono text-xs text-neutral-400 md:text-sm">
          {kicker}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;