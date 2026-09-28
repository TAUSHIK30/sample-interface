import React, { useId } from 'react';

interface SparklineProps {
  data?: number[];
  isPositive?: boolean;
  width?: number;
  height?: number;
  showGradient?: boolean;
  strokeWidth?: number;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data = [20, 18, 15, 12, 14, 8, 4],
  isPositive = true,
  width = 100,
  height = 35,
  showGradient = false,
  strokeWidth = 2,
  className = 'w-full h-11',
}) => {
  const gradientId = useId();
  const color = isPositive ? '#089981' : '#f23645';

  if (!data || data.length === 0) return null;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  // Scale data into SVG coordinates
  // Note: for SVG y-axis, 0 is top. A high price should be near y=4 (top).
  // In the reference HTML:
  // Points: [28, 25, 26, 18, 20, 10, 12, 4] where 4 is top (high) and 28 is lower
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    // Map value so that high value -> low y, low value -> high y
    // We reserve padding of 4px top and 4px bottom
    const y = ((val - minVal) / range) * (height - 8) + 4;
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M${pt.x},${pt.y}` : `${acc} L${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L${width},${height} L0,${height} Z`;

  return (
    <svg className={`${className} overflow-visible`} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0.0} />
        </linearGradient>
      </defs>

      {showGradient && (
        <path d={areaD} fill={`url(#${gradientId})`} />
      )}

      <path
        d={pathD}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
