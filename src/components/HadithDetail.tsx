import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpenCheck,
  Check,
  Copy,
  Share2,
} from 'lucide-react';
import { getBookMeta, getVolumeMeta } from '../data/bukhariMeta';
import { Hadith } from '../types/hadith';

interface HadithDetailProps {
  hadith: Hadith;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onBack: () => void;
  onNavigateHadith?: (hadith: Hadith) => void;
  prevHadith?: Hadith;
  nextHadith?: Hadith;
  currentPage?: number;
  totalPages?: number;
}

export const HadithDetail: React.FC<HadithDetailProps> = ({
  hadith,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onNavigateHadith,
  prevHadith,
  nextHadith,
  currentPage,
  totalPages,
}) => {
  const [copied, setCopied] = useState(false);
  const [sharedMsg, setSharedMsg] = useState(false);

  const volInfo = getVolumeMeta(hadith.volume);
  const bookInfo = getBookMeta(hadith.bookNumber);
  const bookTitle = bookInfo
    ? `${bookInfo.titleArabic} — ${bookInfo.titleUrdu}`
    : `کتاب نمبر ${hadith.bookNumber}`;
  const referenceText = `صحیح بخاری شریف، جلد نمبر ${hadith.volume}، کتاب ${hadith.bookNumber} (${bookTitle})، حدیث نمبر ${hadith.hadithNumber}`;

  const buildShareText = () => {
    return `صحیح بخاری شریف — حدیث نمبر ${hadith.hadithNumber}\nباب / کتاب: ${bookTitle}\nراوی: ${hadith.narrator}\n\nعربی متن:\n${hadith.arabicText}\n\nاردو ترجمہ:\n${hadith.urduText}\n\nحوالہ: ${referenceText}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = buildShareText();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const text = buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `صحیح بخاری شریف — حدیث نمبر ${hadith.hadithNumber}`,
          text,
        });
        return;
      } catch {
        // User cancelled or share unsupported, fall back to copy
      }
    }
    await handleCopy();
    setSharedMsg(true);
    setTimeout(() => setSharedMsg(false), 2200);
  };

  return (
    <article className="w-full max-w-4xl mx-auto">
      {/* Top Back Button & Location Info */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="emerald-btn px-5 py-3 rounded-xl flex items-center gap-2 text-lg sm:text-xl urdu-text cursor-pointer min-h-[48px]"
        >
          <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg text-[var(--text-secondary)] urdu-text tabular-nums">
          <span>جلد نمبر {hadith.volume}</span>
          <span aria-hidden="true">·</span>
          <span>کتاب {hadith.bookNumber}</span>
          <span aria-hidden="true">·</span>
          <span>حدیث نمبر {hadith.hadithNumber}</span>
          {currentPage && totalPages && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#8E6C0B] dark:text-[#E8C547]">
                {currentPage} از {totalPages}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Book Page Card */}
      <div className="islamic-card rounded-2xl p-3 sm:p-5 mb-6">
        <div className="kitab-inner-frame rounded-xl p-5 sm:p-8 space-y-7">
          {/* Header & Bookmark Action */}
          <header className="pb-5 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text mb-2">
                <BookOpenCheck className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span>
                  صحیح بخاری شریف — جلد نمبر {hadith.volume}
                  {volInfo ? ` (${volInfo.subtitle})` : ''}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#FFF8E7] urdu-heading tabular-nums">
                حدیث نمبر {hadith.hadithNumber}
              </h1>
              <p className="mt-2 text-lg sm:text-xl text-[#0B3D2E] dark:text-[#E8C547] urdu-text">
                باب / کتاب: {bookTitle}
              </p>
              <p className="mt-1 text-lg sm:text-xl text-[var(--text-secondary)] urdu-text">
                راوی کا نام: {hadith.narrator}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onToggleBookmark(hadith.id)}
              className={`px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg urdu-text whitespace-nowrap shrink-0 cursor-pointer min-h-[48px] transition-colors ${
                isBookmarked
                  ? 'gold-btn'
                  : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[#C9A227] hover:border-[#0B3D2E]'
              }`}
            >
              <Bookmark
                className={`w-5 h-5 shrink-0 ${isBookmarked ? 'fill-current' : ''}`}
                aria-hidden="true"
              />
              <span>{isBookmarked ? 'محفوظ شدہ' : 'محفوظ کریں'}</span>
            </button>
          </header>

          {/* 1. عربی متن مکمل (اوپر) */}
          <section aria-labelledby="section-arabic" className="pb-6 border-b border-[var(--border-subtle)]">
            <h2
              id="section-arabic"
              className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3"
            >
              عربی متن
            </h2>
            <p
              lang="ar"
              dir="rtl"
              className="text-[var(--text-primary)] arabic-hadith bg-[var(--bg-surface-alt)] border border-[#C9A227]/60 rounded-xl p-5 sm:p-7"
            >
              {hadith.arabicText}
            </p>
          </section>

          {/* 2. اردو ترجمہ مکمل (نیچے) */}
          <section aria-labelledby="section-urdu" className="pb-6 border-b border-[var(--border-subtle)]">
            <h2
              id="section-urdu"
              className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3"
            >
              اردو ترجمہ
            </h2>
            <p className="text-[var(--text-primary)] urdu-prose">
              {hadith.urduText}
            </p>
          </section>

          {/* حوالہ + Share & Copy Action Bar */}
          <footer className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text">
              حوالہ: {referenceText}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="px-5 py-2.5 rounded-xl bg-[var(--bg-surface-alt)] border border-[#C9A227] hover:border-[#0B3D2E] text-base sm:text-lg text-[var(--text-primary)] urdu-text flex items-center gap-2 cursor-pointer min-h-[48px] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-[#0B3D2E] dark:text-[#E8C547]" aria-hidden="true" />
                    <span>کاپی ہو گیا</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" aria-hidden="true" />
                    <span>کاپی کریں</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="emerald-btn px-5 py-2.5 rounded-xl text-base sm:text-lg urdu-text flex items-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Share2 className="w-5 h-5" aria-hidden="true" />
                <span>{sharedMsg ? 'متن کاپی ہو گیا' : 'شیئر کریں'}</span>
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Page-Turning Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {onNavigateHadith && (prevHadith || nextHadith) ? (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={!prevHadith}
              onClick={() => prevHadith && onNavigateHadith(prevHadith)}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-lg sm:text-xl urdu-text min-h-[52px] ${
                prevHadith
                  ? 'emerald-btn cursor-pointer'
                  : 'islamic-card opacity-45 cursor-not-allowed text-[var(--text-secondary)]'
              }`}
            >
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>پچھلی حدیث</span>
            </button>

            <button
              type="button"
              disabled={!nextHadith}
              onClick={() => nextHadith && onNavigateHadith(nextHadith)}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-lg sm:text-xl urdu-text min-h-[52px] ${
                nextHadith
                  ? 'emerald-btn cursor-pointer'
                  : 'islamic-card opacity-45 cursor-not-allowed text-[var(--text-secondary)]'
              }`}
            >
              <span>اگلی حدیث</span>
              <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onBack}
          className="islamic-card-interactive px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-lg sm:text-xl text-[var(--text-primary)] urdu-text cursor-pointer min-h-[52px]"
        >
          <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>
      </div>
    </article>
  );
};
