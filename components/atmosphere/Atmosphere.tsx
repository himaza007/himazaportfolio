'use client';

export function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left Mulberry Deep Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#32292F]/40 blur-[150px]" />

      {/* Center Turquoise Ambient Core */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#99E1D9]/10 blur-[160px]" />

      {/* Bottom Right Mulberry Glow */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#32292F]/30 blur-[150px]" />
    </div>
  );
}

export default Atmosphere;