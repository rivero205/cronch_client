import React from 'react';

const SkeletonCell = ({ width = 'w-full' }) => (
  <div className={`bg-gray-200/80 dark:bg-gray-700/60 animate-pulse rounded h-4 ${width}`} />
);

export default function TableSkeleton({ columns = 4, rows = 4, compact = false, card = false }) {
  const cols = Array.from({ length: columns });
  const rws = Array.from({ length: rows });

  const wrapperClass = card ? `p-4 bg-white rounded-lg border border-gray-100 ${compact ? 'py-2' : ''}` : `p-2 ${compact ? 'py-1' : ''}`;

  return (
    <div className={wrapperClass} aria-hidden>
      <div className="space-y-3">
        {rws.map((_, ri) => (
          <div key={ri} className="flex gap-4 items-center">
            {cols.map((_, ci) => (
              <div key={ci} className={`flex-1 ${ci === 0 ? 'max-w-[140px]' : ''}`}>
                <SkeletonCell />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
