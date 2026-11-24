import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookOpen, ChevronLeft, Search, X } from 'lucide-react';
import { getBookMeta, getBooksByVolume, getVolumeMeta } from '../data/bukhariMeta';
import { getCachedVolumeHadiths, loadVolumeHadiths } from '../data/hadithLoader';
import { Hadith } from '../types/hadith';
import { searchHadiths } from '../utils/search';

interface VolumeDetailProps {
  volumeNumber: number;
  initialBookNumber?: number | null;
  isBookmarked: (id: string) => boolean;
  onBack: () => void;
  onSelectHadith: (hadith: Hadith, contextList: Hadith[]) => void;
}

const PAGE_SIZE = 25;

export const VolumeDetail: React.FC<VolumeDetailProps> = ({
  volumeNumber,
  initialBookNumber = null,
  isBookmarked,
  onBack,
  onSelectHadith,
}) => {
  const [filterText, setFilterText] = useState('');
  const [selectedBook, setSelectedBook] = useState<number | 'ALL'>(
    initialBookNumber ?? 'ALL'
  );
  const [page, setPage] = useState(1);
  const [volumeHadiths, setVolumeHadiths] = useState<Hadith[]>(
    () => getCachedVolumeHadiths(volumeNumber) ?? []
  );
  const [loading, setLoading] = useState<boolean>(() => !getCachedVolumeHadiths(volumeNumber));

  const volumeMeta = getVolumeMeta(volumeNumber);
  const booksInVolume = useMemo(() => getBooksByVolume(volumeNumber), [volumeNumber]);

  useEffect(() => {
    setSelectedBook(initialBookNumber ?? 'ALL');
    setPage(1);
    setFilterText('');
  }, [volumeNumber, initialBookNumber]);

  useEffect(() => {
    let active = true;
    const cached = getCachedVolumeHadiths(volumeNumber);
    if (cached) {
      setVolumeHadiths(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    loadVolumeHadiths(volumeNumber)
      .then((list) => {
        if (active) {
          setVolumeHadiths(list);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [volumeNumber]);

  const displayedHadiths = useMemo(() => {
    let list = volumeHadiths;
    if (selectedBook !== 'ALL') {
      list = list.filter((h) => h.bookNumber === selectedBook);
    }
    if (filterText.trim()) {
      list = searchHadiths(list, filterText).map((r) => r.hadith);
    }
    return list;
  }, [volumeHadiths, selectedBook, filterText]);

  const totalPages = Math.max(1, Math.ceil(displayedHadiths.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedHadiths = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return displayedHadiths.slice(start, start + PAGE_SIZE);
  }, [displayedHadiths, safePage]);

  const handleSelectBook = (bookNum: number | 'ALL') => {
    setSelectedBook(bookNum);
    setPage(1);
  };

  const handleFilterChange = (val: string) => {
    setFilterText(val);
    setPage(1);
  };

  const activeBookMeta = selectedBook !== 'ALL' ? getBookMeta(selectedBook) : undefined;

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
              <span>کتابیں: {volumeMeta.bookCount}</span>
              <span aria-hidden="true">·</span>
              <span>احادیث: {volumeMeta.hadithCount.toLocaleString('en-US')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#0B3D2E] dark:text-[#E8C547]">
                حدیث {volumeMeta.firstHadith} تا {volumeMeta.lastHadith}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Volume Header & Books Directory */}
      <div className="islamic-card rounded-2xl p-4 sm:p-6 mb-6">
        <div className="kitab-inner-frame rounded-xl p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-xl bg-[#0B3D2E] border border-[#C9A227] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#C9A227]" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text">
                صحیح بخاری شریف — کتابیں و ابواب
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
              onChange={(e) => handleFilterChange(e.target.value)}
              placeholder="اس جلد میں حدیث نمبر، راوی یا لفظ تلاش کریں..."
              aria-label="اس جلد میں حدیث تلاش کریں"
              className="search-input-islamic w-full rounded-xl pr-13 pl-11 py-3.5 text-lg sm:text-xl urdu-text"
            />
            {filterText && (
              <button
                type="button"
                onClick={() => handleFilterChange('')}
                aria-label="تلاش صاف کریں"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1.5 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Books / Abwab Directory inside Volume */}
          <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
            <h2 className="text-lg sm:text-xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3">
              اس جلد کی کتابیں ({booksInVolume.length}):
            </h2>
            <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="جلد کی کتابیں">
              <button
                type="button"
                role="tab"
                aria-selected={selectedBook === 'ALL'}
                onClick={() => handleSelectBook('ALL')}
                className={`px-4 py-2 rounded-xl text-base sm:text-lg urdu-text cursor-pointer min-h-[44px] transition-colors ${
                  selectedBook === 'ALL'
                    ? 'emerald-btn'
                    : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#C9A227]'
                }`}
              >
                تمام کتابیں ({volumeMeta?.hadithCount ?? volumeHadiths.length})
              </button>
              {booksInVolume.map((book) => {
                const isActive = selectedBook === book.bookNumber;
                return (
                  <button
                    key={book.bookNumber}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectBook(book.bookNumber)}
                    className={`px-4 py-2 rounded-xl text-base sm:text-lg urdu-text cursor-pointer min-h-[44px] transition-colors ${
                      isActive
                        ? 'emerald-btn'
                        : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#C9A227]'
                    }`}
                  >
                    {book.bookNumber}. {book.titleArabic} — {book.titleUrdu} ({book.hadithCount})
                  </button>
                );
              })}
            </div>
          </div>

          {activeBookMeta && (
            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
              <p className="text-lg sm:text-xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading">
                کتاب {activeBookMeta.bookNumber}: {activeBookMeta.titleArabic} — {activeBookMeta.titleUrdu}
              </p>
              <p className="text-base text-[var(--text-secondary)] urdu-text tabular-nums">
                کل احادیث: {activeBookMeta.hadithCount} (حدیث {activeBookMeta.firstHadith} تا {activeBookMeta.lastHadith})
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hadiths List */}
      {loading ? (
        <div className="islamic-card rounded-2xl p-8 text-center">
          <p className="text-xl text-[var(--text-primary)] urdu-text">
            احادیث مبارکہ لوڈ ہو رہی ہیں...
          </p>
        </div>
      ) : displayedHadiths.length === 0 ? (
        <div className="islamic-card rounded-2xl p-8 text-center">
          <p className="text-xl text-[var(--text-primary)] urdu-text">
            اس کتاب یا تلاش میں کوئی حدیث نہیں ملی۔
          </p>
          <button
            type="button"
            onClick={() => {
              handleSelectBook('ALL');
              handleFilterChange('');
            }}
            className="emerald-btn mt-4 px-6 py-3 rounded-xl text-lg urdu-text cursor-pointer min-h-[48px]"
          >
            اس جلد کی تمام احادیث دکھائیں
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-base sm:text-lg text-[var(--text-secondary)] urdu-text tabular-nums">
            <span>
              دکھائی جانے والی احادیث: {(safePage - 1) * PAGE_SIZE + 1} تا{' '}
              {Math.min(safePage * PAGE_SIZE, displayedHadiths.length)} از {displayedHadiths.length}
            </span>
            <span>
              صفحہ {safePage} از {totalPages}
            </span>
          </div>

          <div className="space-y-4">
            {pagedHadiths.map((hadith) => {
              const saved = isBookmarked(hadith.id);
              const book = getBookMeta(hadith.bookNumber);
              return (
                <button
                  key={hadith.id}
                  type="button"
                  onClick={() => onSelectHadith(hadith, displayedHadiths)}
                  className="islamic-card-interactive w-full text-right rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text tabular-nums">
                      <span>حدیث نمبر {hadith.hadithNumber}</span>
                      {book && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{book.titleArabic}</span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--text-secondary)]">{hadith.narrator}</span>
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
                    <p
                      className="arabic-hadith text-[var(--text-primary)] mt-2 line-clamp-2"
                      style={{ fontSize: 'calc(1.6rem * var(--font-scale))', lineHeight: 2.25 }}
                    >
                      {hadith.arabicText}
                    </p>
                    <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text mt-2 line-clamp-2">
                      {hadith.urduText}
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

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 text-lg urdu-text min-h-[48px] ${
                  safePage > 1
                    ? 'emerald-btn cursor-pointer'
                    : 'islamic-card opacity-45 cursor-not-allowed text-[var(--text-secondary)]'
                }`}
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                <span>پچھلا صفحہ</span>
              </button>

              <span className="text-base sm:text-lg text-[var(--text-secondary)] urdu-text tabular-nums">
                صفحہ {safePage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 text-lg urdu-text min-h-[48px] ${
                  safePage < totalPages
                    ? 'emerald-btn cursor-pointer'
                    : 'islamic-card opacity-45 cursor-not-allowed text-[var(--text-secondary)]'
                }`}
              >
                <span>اگلا صفحہ</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
