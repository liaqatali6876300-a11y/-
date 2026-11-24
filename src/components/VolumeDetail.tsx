import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, ChevronLeft, Search, X } from 'lucide-react';
import { getMasailByVolume } from '../data/allMasail';
import { VOLUMES_META } from '../data/volumesMeta';
import { Masla } from '../types/fatwa';
import { searchMasail } from '../utils/search';

interface VolumeDetailProps {
  volumeNumber: number;
  onBack: () => void;
  onSelectMasla: (masla: Masla) => void;
}

export const VolumeDetail: React.FC<VolumeDetailProps> = ({
  volumeNumber,
  onBack,
  onSelectMasla,
}) => {
  const [filterText, setFilterText] = useState('');

  const volumeMeta = VOLUMES_META.find((v) => v.volume === volumeNumber);
  const volumeMasail = useMemo(() => getMasailByVolume(volumeNumber), [volumeNumber]);

  const displayedMasail = useMemo(() => {
    if (!filterText.trim()) return volumeMasail;
    return searchMasail(volumeMasail, filterText).map((r) => r.masla);
  }, [volumeMasail, filterText]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Top Green Back Button */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="green-btn px-5 py-2.5 rounded-xl flex items-center gap-2 text-base urdu-text cursor-pointer min-h-[44px]"
        >
          <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>

        <span className="text-sm sm:text-base text-white/85 urdu-text tabular-nums">
          کل مسائل: {volumeMasail.length}
        </span>
      </div>

      {/* Volume Book Cover Header */}
      <div className="teal-card rounded-2xl p-5 sm:p-7 mb-6">
        <div className="kitab-page-frame rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#083852]/80 border border-white/25 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#00E676]" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-[#00E676] urdu-text">
                فتاویٰ رضویہ — کتاب کی فہرستِ مسائل
              </p>
              <h1 className="text-2xl sm:text-3xl text-white urdu-heading tabular-nums mt-0.5">
                {volumeMeta?.name ?? `جلد نمبر ${volumeNumber}`}
              </h1>
              {volumeMeta?.subtitle && (
                <p className="text-base sm:text-lg text-white/95 urdu-text mt-1">
                  {volumeMeta.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Search within this volume */}
          <div className="mt-5 relative">
            <Search
              className="w-5 h-5 text-white/75 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="اس جلد میں مسئلہ تلاش کریں (اردو یا رومن اردو)..."
              aria-label="اس جلد میں مسئلہ تلاش کریں"
              className="search-input-box w-full rounded-xl pr-12 pl-11 py-3 text-base urdu-text placeholder:text-white/60"
            />
            {filterText && (
              <button
                type="button"
                onClick={() => setFilterText('')}
                aria-label="تلاش صاف کریں"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1.5 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Book Chapter Index Masail List */}
      {displayedMasail.length === 0 ? (
        <div className="teal-card rounded-2xl p-8 text-center">
          <p className="text-lg text-white urdu-text">
            اس جلد میں آپ کے الفاظ سے کوئی مسئلہ نہیں ملا۔
          </p>
          <button
            type="button"
            onClick={() => setFilterText('')}
            className="green-btn mt-4 px-5 py-2 rounded-xl text-base urdu-text cursor-pointer"
          >
            تمام مسائل دکھائیں
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedMasail.map((masla, index) => (
            <button
              key={masla.id}
              type="button"
              onClick={() => onSelectMasla(masla)}
              className="teal-card-interactive w-full text-right rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm text-white/80 urdu-text tabular-nums">
                  <span className="text-[#00E676]">صفحہ / مسئلہ {index + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{masla.topic}</span>
                </div>
                <h2 className="text-lg sm:text-xl text-white urdu-heading mt-1">
                  {masla.title}
                </h2>
                <p className="text-sm sm:text-base text-white/90 urdu-text mt-1.5 line-clamp-2">
                  {masla.question}
                </p>
              </div>
              <ChevronLeft className="w-5 h-5 text-white/85 shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
