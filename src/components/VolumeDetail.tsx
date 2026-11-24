import React, { useMemo, useState } from 'react';
import { ArrowRight, Bookmark, BookOpen, ChevronLeft, Search, X } from 'lucide-react';
import { getMasailByVolume } from '../data/allMasail';
import { VOLUMES_META } from '../data/volumesMeta';
import { Masla } from '../types/fatwa';
import { searchMasail } from '../utils/search';

interface VolumeDetailProps {
  volumeNumber: number;
  isBookmarked: (id: string) => boolean;
  onBack: () => void;
  onSelectMasla: (masla: Masla) => void;
}

export const VolumeDetail: React.FC<VolumeDetailProps> = ({
  volumeNumber,
  isBookmarked,
  onBack,
  onSelectMasla,
}) => {
  const [filterText, setFilterText] = useState('');
  const [selectedBab, setSelectedBab] = useState<string>('ALL');
  const [selectedRisala, setSelectedRisala] = useState<string>('ALL');

  const volumeMeta = VOLUMES_META.find((v) => v.volume === volumeNumber);
  const volumeMasail = useMemo(() => getMasailByVolume(volumeNumber), [volumeNumber]);

  const abwabList = useMemo(() => {
    const baseAbwab = volumeMeta?.abwab ?? [];
    const fromMasail = Array.from(
      new Set(volumeMasail.map((m) => m.bab).filter((b): b is string => !!b))
    );
    return Array.from(new Set([...baseAbwab, ...fromMasail]));
  }, [volumeMeta, volumeMasail]);

  const rasailList = useMemo(() => {
    const baseRasail = volumeMeta?.rasail ?? [];
    const fromMasail = Array.from(
      new Set(volumeMasail.map((m) => m.risalaName).filter((r): r is string => !!r))
    );
    return Array.from(new Set([...baseRasail, ...fromMasail]));
  }, [volumeMeta, volumeMasail]);

  const displayedMasail = useMemo(() => {
    let list = volumeMasail;
    if (selectedBab !== 'ALL') {
      list = list.filter((m) => m.bab === selectedBab);
    }
    if (selectedRisala !== 'ALL') {
      list = list.filter((m) => m.risalaName === selectedRisala);
    }
    if (filterText.trim()) {
      list = searchMasail(list, filterText).map((r) => r.masla);
    }
    return list;
  }, [volumeMasail, selectedBab, selectedRisala, filterText]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Top Green Back Button & Stats */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="emerald-btn px-5 py-3 rounded-xl flex items-center gap-2 text-lg sm:text-xl urdu-text cursor-pointer min-h-[48px]"
        >
          <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg text-[var(--text-secondary)] urdu-text tabular-nums">
          {volumeMeta && (
            <>
              <span>اصل سوال جواب: {volumeMeta.totalFatwas}</span>
              <span aria-hidden="true">·</span>
              <span>رسائل: {volumeMeta.rasailCount}</span>
              <span aria-hidden="true">·</span>
              <span>صفحات: {volumeMeta.printedPages}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span className="text-[#0B3D2E] dark:text-[#E8C547]">
            شامل مکمل فتاویٰ: {volumeMasail.length}
          </span>
        </div>
      </div>

      {/* Volume Header & Abwab / Rasail Index */}
      <div className="islamic-card rounded-2xl p-4 sm:p-6 mb-6">
        <div className="kitab-inner-frame rounded-xl p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-xl bg-[#0B3D2E] border border-[#C9A227] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#C9A227]" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text">
                العطایا النبویہ فی الفتاویٰ الرضویہ — ابواب و رسائل
              </p>
              <h1 className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#FFF8E7] urdu-heading tabular-nums mt-0.5">
                {volumeMeta?.name ?? `جلد نمبر ${volumeNumber}`}
              </h1>
              {volumeMeta?.subtitle && (
                <p className="text-xl sm:text-2xl text-[var(--text-secondary)] urdu-text mt-1">
                  {volumeMeta.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Search within this volume */}
          <div className="mt-5 relative">
            <Search
              className="w-6 h-6 text-[var(--text-secondary)] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="اس جلد میں مسئلہ، باب یا رسالہ تلاش کریں (اردو یا رومن اردو)..."
              aria-label="اس جلد میں مسئلہ تلاش کریں"
              className="search-input-islamic w-full rounded-xl pr-13 pl-11 py-3.5 text-lg sm:text-xl urdu-text"
            />
            {filterText && (
              <button
                type="button"
                onClick={() => setFilterText('')}
                aria-label="تلاش صاف کریں"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1.5 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Abwab (Chapters) Directory inside Volume */}
          <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
            <h2 className="text-lg sm:text-xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3">
              اس جلد کے ابواب (فہرست):
            </h2>
            <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="جلد کے ابواب">
              <button
                type="button"
                role="tab"
                aria-selected={selectedBab === 'ALL'}
                onClick={() => setSelectedBab('ALL')}
                className={`px-4 py-2 rounded-xl text-base sm:text-lg urdu-text cursor-pointer min-h-[44px] transition-colors ${
                  selectedBab === 'ALL'
                    ? 'emerald-btn'
                    : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#C9A227]'
                }`}
              >
                تمام ابواب ({volumeMasail.length})
              </button>
              {abwabList.map((bab) => {
                const babCount = volumeMasail.filter((m) => m.bab === bab).length;
                const isActive = selectedBab === bab;
                return (
                  <button
                    key={bab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedBab(bab)}
                    className={`px-4 py-2 rounded-xl text-base sm:text-lg urdu-text cursor-pointer min-h-[44px] transition-colors ${
                      isActive
                        ? 'emerald-btn'
                        : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#C9A227]'
                    }`}
                  >
                    {bab} ({babCount})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rasail (Treatises) Directory inside Volume */}
          {rasailList.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
              <h2 className="text-lg sm:text-xl text-[#8E6C0B] dark:text-[#E8C547] urdu-heading mb-3">
                اس جلد کے رسائل ({volumeMeta?.rasailCount ?? rasailList.length}):
              </h2>
              <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="جلد کے رسائل">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedRisala === 'ALL'}
                  onClick={() => setSelectedRisala('ALL')}
                  className={`px-4 py-2 rounded-xl text-base sm:text-lg urdu-text cursor-pointer min-h-[44px] transition-colors ${
                    selectedRisala === 'ALL'
                      ? 'gold-btn'
                      : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#C9A227]'
                  }`}
                >
                  تمام رسائل
                </button>
                {rasailList.map((risala) => {
                  const risalaCount = volumeMasail.filter((m) => m.risalaName === risala).length;
                  const isActive = selectedRisala === risala;
                  return (
                    <button
                      key={risala}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedRisala(risala)}
                      className={`px-4 py-2 rounded-xl text-base sm:text-lg urdu-text cursor-pointer min-h-[44px] transition-colors ${
                        isActive
                          ? 'gold-btn'
                          : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#C9A227]'
                      }`}
                    >
                      {risala} {risalaCount > 0 ? `(${risalaCount})` : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Masail List */}
      {displayedMasail.length === 0 ? (
        <div className="islamic-card rounded-2xl p-8 text-center">
          <p className="text-xl text-[var(--text-primary)] urdu-text">
            اس باب، رسالہ یا تلاش میں فی الحال کوئی مسئلہ منتخب الفاظ سے مطابق نہیں۔
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedBab('ALL');
              setSelectedRisala('ALL');
              setFilterText('');
            }}
            className="emerald-btn mt-4 px-6 py-3 rounded-xl text-lg urdu-text cursor-pointer min-h-[48px]"
          >
            اس جلد کے تمام مسائل دکھائیں
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedMasail.map((masla, index) => {
            const saved = isBookmarked(masla.id);
            return (
              <button
                key={masla.id}
                type="button"
                onClick={() => onSelectMasla(masla)}
                className="islamic-card-interactive w-full text-right rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text tabular-nums">
                    <span>سوال نمبر {masla.sawalNumber ?? index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{masla.bab ?? masla.topic}</span>
                    {masla.risalaName && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[var(--text-secondary)]">{masla.risalaName}</span>
                      </>
                    )}
                    {saved && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 text-[#0B3D2E] dark:text-[#E8C547]">
                          <Bookmark className="w-4 h-4 fill-current" aria-hidden="true" />
                          محفوظ
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-[var(--text-primary)] urdu-heading mt-1.5">
                    {masla.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text mt-2 line-clamp-2">
                    {masla.question}
                  </p>
                </div>
                <ChevronLeft
                  className="w-6 h-6 text-[#0B3D2E] dark:text-[#C9A227] shrink-0"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
