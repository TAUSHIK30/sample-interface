import React from 'react';

interface TickerIconProps {
  type?: string;
  badgeNumber?: string;
  badgeColor?: string;
  symbol?: string;
  className?: string;
}

export const TickerIcon: React.FC<TickerIconProps> = ({
  type,
  badgeNumber,
  badgeColor = '#2962ff',
  symbol,
  className = '',
}) => {
  // If specific company icon type
  if (type === 'nvda') {
    return (
      <div className={`w-10 h-10 rounded-full bg-[#76b900] flex items-center justify-center shrink-0 shadow-xs ${className}`}>
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M8.94 6.04c-1.35 0-4.08.79-4.8 3.52 1.63-1.63 3.48-1.74 4.8-1.74 3.01 0 5.48 2.07 5.48 5.46 0 3.39-2.47 5.46-5.48 5.46-2.14 0-4.14-1.2-4.9-3.23.63 3.32 3.35 5.09 5.86 5.09 4.3 0 7.68-3.04 7.68-7.32s-3.38-7.24-8.64-7.24zM3 13.28c0 1.25.32 2.37.91 3.28-.6-.91-.91-2.03-.91-3.28s.31-2.37.91-3.28C3.32 10.91 3 12.03 3 13.28z" />
        </svg>
      </div>
    );
  }

  if (type === 'aapl') {
    return (
      <div className={`w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 shadow-xs ${className}`}>
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.35-.56.65-1.06 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23z" />
        </svg>
      </div>
    );
  }

  if (type === 'msft') {
    return (
      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 shadow-xs border border-gray-200 ${className}`}>
        <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
          <div className="bg-[#f25022]"></div>
          <div className="bg-[#7fba00]"></div>
          <div className="bg-[#00a4ef]"></div>
          <div className="bg-[#ffb900]"></div>
        </div>
      </div>
    );
  }

  if (type === 'tsla') {
    return (
      <div className={`w-10 h-10 rounded-full bg-[#e82127] flex items-center justify-center shrink-0 shadow-xs ${className}`}>
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 4.45c2.72 0 6.07.45 8.65 1.54l.43-2.18C18.15 2.65 14.88 2.2 12 2.2c-2.88 0-6.15.45-9.08 1.61l.43 2.18c2.58-1.09 5.93-1.54 8.65-1.54zm-6.9 3.59l.79 2.05c3.08-1.06 5.86-1.05 8.22 0l.79-2.05c-3.15-1.25-6.66-1.25-9.8 0zM12 9.77c-2.48 0-4.32.74-5.26 1.34l5.26 10.69 5.26-10.69c-.94-.6-2.78-1.34-5.26-1.34z" />
        </svg>
      </div>
    );
  }

  // If numeric badge (500, 100, 30, 225, 40, etc.)
  if (badgeNumber) {
    return (
      <div
        className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[11px] tracking-tighter shrink-0 ${className}`}
        style={{ backgroundColor: badgeColor }}
      >
        {badgeNumber}
      </div>
    );
  }

  // Fallback to first letters of symbol
  return (
    <div
      className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-[12px] shrink-0 ${className}`}
      style={{ backgroundColor: badgeColor }}
    >
      {(symbol || 'TV').slice(0, 3)}
    </div>
  );
};

export const UsFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <span className={`${className} rounded-full overflow-hidden inline-flex items-center justify-center shrink-0 border border-gray-200`}>
    <svg className="w-full h-full" viewBox="0 0 64 64">
      <rect fill="#bd3d44" height="64" width="64"></rect>
      <path d="M0 8h64M0 16h64M0 24h64M0 32h64M0 40h64M0 48h64M0 56h64" stroke="#fff" strokeWidth="4.92"></path>
      <rect fill="#192f5d" height="34" width="28"></rect>
      <circle cx="6" cy="7" fill="#fff" r="1.5"></circle>
      <circle cx="14" cy="7" fill="#fff" r="1.5"></circle>
      <circle cx="22" cy="7" fill="#fff" r="1.5"></circle>
      <circle cx="10" cy="14" fill="#fff" r="1.5"></circle>
      <circle cx="18" cy="14" fill="#fff" r="1.5"></circle>
      <circle cx="6" cy="21" fill="#fff" r="1.5"></circle>
      <circle cx="14" cy="21" fill="#fff" r="1.5"></circle>
      <circle cx="22" cy="21" fill="#fff" r="1.5"></circle>
      <circle cx="10" cy="28" fill="#fff" r="1.5"></circle>
      <circle cx="18" cy="28" fill="#fff" r="1.5"></circle>
    </svg>
  </span>
);
