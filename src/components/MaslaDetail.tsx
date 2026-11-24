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
import { VOLUMES_META } from '../data/volumesMeta';
import { Masla } from '../types/fatwa';

interface MaslaDetailProps {
  masla: Masla;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onBack: () => void;
  onNavigateMasla?: (masla: Masla) => void;
  prevMasla?: Masla;
  nextMasla?: Masla;
  currentPage?: number;
  totalPages?: number;
}

export const MaslaDetail: React.FC<MaslaDetailProps> = ({
  masla,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onNavigateMasla,
  prevMasla,
  nextMasla,
  currentPage,
  totalPages,
}) => {
  const [copied, setCopied] = useState(false);
  const [sharedMsg, setSharedMsg] = useState(false);

  const volInfo = VOLUMES_META.find((v) => v.volume === masla.volume);
  const sawalDisplay = masla.sawalNumber ? `سوال نمبر ${masla.sawalNumber}` : '';
  const risalaDisplay = masla.risalaName ? `رسالہ: ${masla.risalaName}` : '';
  const referenceText = `العطایا النبویہ فی الفتاویٰ الرضویہ، جلد نمبر ${masla.volume}، ${masla.bab ?? masla.topic}${masla.risalaName ? `، ${masla.risalaName}` : ''}${sawalDisplay ? ` (${sawalDisplay})` : ''}`;

  const buildShareText = () => {
    return `${masla.title}${sawalDisplay ? `\n${sawalDisplay}` : ''}${risalaDisplay ? ` | ${risalaDisplay}` : ''}\n\nسوال:\n${masla.question}\n\nجواب / فتویٰ:\n${masla.answer}\n\nدلیل:\n${masla.dalil}\n\nضروری وضاحت:\n${masla.explanation}\n\nحوالہ: ${referenceText}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy
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
          title: `فتاویٰ رضویہ — ${masla.title}`,
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
          <span>جلد نمبر {masla.volume}</span>
          {sawalDisplay && (
            <>
              <span aria-hidden="true">·</span>
              <span>{sawalDisplay}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{masla.bab ?? masla.topic}</span>
          {currentPage && totalPages && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#8E6C0B] dark:text-[#E8C547]">
                فتویٰ {currentPage} از {totalPages}
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
                  فتاویٰ رضویہ — جلد نمبر {masla.volume}
                  {volInfo ? ` (${volInfo.subtitle})` : ''}
                </span>
                {sawalDisplay && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#0B3D2E] dark:text-[#E8C547]">{sawalDisplay}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#FFF8E7] urdu-heading">
                {masla.title}
              </h1>
              {masla.risalaName && (
                <p className="mt-2 text-lg sm:text-xl text-[var(--text-secondary)] urdu-text">
                  رسالے کا نام: {masla.risalaName}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onToggleBookmark(masla.id)}
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

          {/* 1. سوال */}
          <section aria-labelledby="section-question" className="pb-6 border-b border-[var(--border-subtle)]">
            <h2
              id="section-question"
              className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3"
            >
              1. سوال
            </h2>
            <p className="text-[var(--text-primary)] urdu-prose">
              {masla.question}
            </p>
          </section>

          {/* 2. جواب / فتویٰ */}
          <section aria-labelledby="section-answer" className="pb-6 border-b border-[var(--border-subtle)]">
            <h2
              id="section-answer"
              className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3"
            >
              2. جواب / فتویٰ
            </h2>
            <p className="text-[var(--text-primary)] urdu-prose">
              {masla.answer}
            </p>
          </section>

          {/* 3. دلیل */}
          <section aria-labelledby="section-dalil" className="pb-6 border-b border-[var(--border-subtle)]">
            <h2
              id="section-dalil"
              className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3"
            >
              3. دلیل (قرآن و حدیث سے)
            </h2>
            <p className="text-[var(--text-primary)] urdu-prose bg-[var(--bg-surface-alt)] border border-[#C9A227]/55 rounded-xl p-5 sm:p-6">
              {masla.dalil}
            </p>
          </section>

          {/* 4. ضروری وضاحت */}
          <section aria-labelledby="section-explanation" className="pb-6 border-b border-[var(--border-subtle)]">
            <h2
              id="section-explanation"
              className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mb-3"
            >
              4. ضروری وضاحت
            </h2>
            <p className="text-[var(--text-primary)] urdu-prose">
              {masla.explanation}
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
                <span>{sharedMsg ? 'لنک/متن کاپی ہو گیا' : 'شیئر کریں'}</span>
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Page-Turning Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {onNavigateMasla && (prevMasla || nextMasla) ? (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={!prevMasla}
              onClick={() => prevMasla && onNavigateMasla(prevMasla)}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-lg sm:text-xl urdu-text min-h-[52px] ${
                prevMasla
                  ? 'emerald-btn cursor-pointer'
                  : 'islamic-card opacity-45 cursor-not-allowed text-[var(--text-secondary)]'
              }`}
            >
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>پچھلا فتویٰ</span>
            </button>

            <button
              type="button"
              disabled={!nextMasla}
              onClick={() => nextMasla && onNavigateMasla(nextMasla)}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-lg sm:text-xl urdu-text min-h-[52px] ${
                nextMasla
                  ? 'emerald-btn cursor-pointer'
                  : 'islamic-card opacity-45 cursor-not-allowed text-[var(--text-secondary)]'
              }`}
            >
              <span>اگلا فتویٰ</span>
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
