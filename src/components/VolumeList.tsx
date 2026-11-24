import React from 'react';
import { BookMarked, ChevronLeft } from 'lucide-react';
import {
  ALL_MASAIL,
  TOTAL_PRINTED_FATWAS,
  TOTAL_PRINTED_PAGES,
  TOTAL_RASAIL,
  getMasailByVolume,
} from '../data/allMasail';
import { VOLUMES_META } from '../data/volumesMeta';

interface VolumeListProps {
  onSelectVolume: (volumeNumber: number) => void;
}

export const VolumeList: React.FC<VolumeListProps> = ({ onSelectVolume }) => {
  return (
    <section aria-labelledby="volumes-heading" className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-6">
        <h2
          id="volumes-heading"
          className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading"
        >
          مکمل 30 جلدیں (جلد نمبر 1 تا جلد نمبر 30)
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] urdu-text tabular-nums">
          کل سوال جواب: {TOTAL_PRINTED_FATWAS.toLocaleString('en-US')} · رسائل: {TOTAL_RASAIL} · صفحات: {TOTAL_PRINTED_PAGES.toLocaleString('en-US')}+ · شامل مکمل فتاویٰ: {ALL_MASAIL.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {VOLUMES_META.map((vol) => {
          const count = getMasailByVolume(vol.volume).length;
          return (
            <button
              key={vol.volume}
              type="button"
              onClick={() => onSelectVolume(vol.volume)}
              className="volume-card w-full text-right rounded-2xl p-3.5 sm:p-4 cursor-pointer"
            >
              <div className="volume-card-inner rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className="w-12 h-14 rounded-xl bg-[#072B20] border border-[#C9A227] flex items-center justify-center shrink-0">
                    <BookMarked className="w-6 h-6 text-[#C9A227]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl sm:text-3xl text-[#FFF8E7] urdu-heading tabular-nums">
                      {vol.name}
                    </h3>
                    <p className="text-lg sm:text-xl text-[#F5DC84] urdu-text mt-1 line-clamp-2">
                      {vol.subtitle}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base sm:text-lg text-[#FFFDF5] urdu-text tabular-nums">
                      <span>سوال جواب: {vol.totalFatwas}</span>
                      <span className="text-[#C9A227]" aria-hidden="true">·</span>
                      <span>رسائل: {vol.rasailCount}</span>
                      <span className="text-[#C9A227]" aria-hidden="true">·</span>
                      <span>صفحات: {vol.printedPages}</span>
                    </div>
                    <p className="mt-1 text-base sm:text-lg text-[#F2D15B] urdu-text tabular-nums">
                      ابواب: {vol.abwab.length} · شامل مکمل فتاویٰ: {count}
                    </p>
                  </div>
                </div>
                <ChevronLeft
                  className="w-6 h-6 text-[#C9A227] shrink-0"
                  aria-hidden="true"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
