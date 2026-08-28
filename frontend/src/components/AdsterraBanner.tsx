import React from 'react';

interface AdsterraProps {
  type: 'banner' | 'native';
}

export const AdsterraBanner: React.FC<AdsterraProps> = ({ type }) => {
  return (
    <div className="w-full my-6 flex justify-center items-center overflow-hidden">
      <div className="p-4 bg-slate-900/50 backdrop-blur rounded-xl border border-amber-500/20 text-center w-full max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-amber-400/60 block mb-2">
          Advertisement ({type})
        </span>
        {/* Adsterra Script Placement Placeholder */}
        <div id={`adsterra-zone-${type}`} className="min-h-[90px] flex items-center justify-center text-slate-500 text-sm">
          Adsterra {type === 'banner' ? '728x90 Banner Zone' : 'Native Ad Widget Zone'}
        </div>
      </div>
    </div>
  );
};
