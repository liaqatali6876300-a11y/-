import React from 'react';
import { BookMarked, ChevronLeft } from 'lucide-react';
import { VOLUMES_META } from '../data/volumesMeta';
import { getMasailByVolume } from '../data/allMasail';

interface VolumeListProps {
  onSelectVolume: (volumeNumber: number) => void;
}

export const VolumeList: React.FC<VolumeListProps> = ({ onSelectVolume }) => {
  return (
    <section aria-labelledby="volumes-heading" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 id="volumes-heading" className="text-2xl sm:text-3xl text-white urdu-heading">
          کتاب کے 30 حصے — جلد نمبر 1 تا جلد نمبر 30
        </h2>
        <p className="text-sm sm:text-base text-white/85 urdu-text tabular-nums">
          جلد کھولنے کے لیے کسی بھی کتاب پر کلک کریں
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VOLUMES_META.map((vol) => {
          const count = getMasailByVolume(vol.volume).length;
          return (
            <button
              key={vol.volume}
              type="button"
              onClick={() => onSelectVolume(vol.volume)}
              className="teal-card-interactive w-full text-right rounded-2xl p-4 sm:p-5 cursor-pointer min-h-[92px]"
            >
              <div className="kitab-page-frame rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className="w-11 h-12 rounded-xl bg-[#083852]/85 border border-white/25 flex flex-col items-center justify-center shrink-0">
                    <BookMarked className="w-5 h-5 text-[#00E676]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg sm:text-xl text-white urdu-heading tabular-nums">
                        {vol.name}
                      </span>
                      <span className="text-white/50" aria-hidden="true">·</span>
                      <span className="text-sm text-[#00E676] urdu-text tabular-nums">
                        {count} مسائل
                      </span>
                    </div>
                    <p className="text-sm text-white/90 urdu-text mt-1 line-clamp-2">
                      {vol.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-white/80 shrink-0" aria-hidden="true" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
