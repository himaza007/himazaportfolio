import { ATLAS, ATLAS_URL } from '@/lib/logo-atlas';

export default function AtlasDebug() {
  return (
    <main className="min-h-screen bg-neutral-900 p-8 text-white">
      <h1 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
        Atlas debug · {ATLAS.length} slices · {ATLAS_URL}
      </h1>
      <div className="relative mt-6 inline-block bg-neutral-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ATLAS_URL} alt="" className="block max-w-full" />
        {ATLAS.map((r) => (
          <div
            key={r.id}
            className="absolute border border-red-500"
            style={{
              left: `${r.x * 100}%`,
              top: `${r.y * 100}%`,
              width: `${r.w * 100}%`,
              height: `${r.h * 100}%`,
            }}
          >
            <span className="absolute -top-4 left-0 font-mono text-[9px] text-red-400">{r.id}</span>
          </div>
        ))}
      </div>
    </main>
  );
}