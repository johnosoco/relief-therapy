import React from 'react';

interface AdPlacementProps {
  className?: string;
}

const AdPlacement: React.FC<AdPlacementProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-4 my-8 flex flex-col items-center justify-center text-center text-slate-500 ${className}`}
      aria-label="Advertisement placeholder"
    >
      {/* TODO: Replace this placeholder with your ad code from Google AdSense or another provider. */}
      <p className="text-sm font-semibold mb-2">Advertisement</p>
      <div className="w-full h-full min-h-[90px] bg-slate-200 flex items-center justify-center rounded">
        <p className="text-xs">Your Ad Here</p>
      </div>
    </div>
  );
};

export default AdPlacement;
