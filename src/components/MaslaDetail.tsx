import React from 'react';
import { ArrowLeft, ArrowRight, BookOpenCheck } from 'lucide-react';
import { Masla } from '../types/fatwa';
import { VOLUMES_META } from '../data/volumesMeta';

interface MaslaDetailProps {
  masla: Masla;
  onBack: () => void;
  onNavigateMasla?: (masla: Masla) => void;
  prevMasla?: Masla;
  nextMasla?: Masla;
  currentPage?: number;
  totalPages?: number;
}

export const MaslaDetail: React.FC<MaslaDetailProps> = ({
  masla,
  onBack,
  onNavigateMasla,
  prevMasla,
  nextMasla,
  currentPage,
  totalPages,
}) => {
  const volInfo = VOLUMES_META.find((v) => v.volume === masla.volume);

  return (
    <article className="w-full max-w-4xl mx-auto">
      {/* Top Green Back Button & Book Page Metadata */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="green-btn px-5 py-2.5 rounded-xl flex items-center gap-2 text-base urdu-text cursor-pointer min-h-[44px]"
        >
          <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>

        <div className="flex items-center gap-2 text-sm sm:text-base text-white/90 urdu-text tabular-nums">
          <span>جلد نمبر {masla.volume}</span>
          <span aria-hidden="true">·</span>
          <span>{masla.topic}</span>
          {currentPage && totalPages && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#00E676]">
                صفحہ {currentPage} از {totalPages}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Book Page Container */}
      <div className="teal-card rounded-2xl p-4 sm:p-6 mb-6">
        <div className="kitab-page-frame rounded-xl p-5 sm:p-8 space-y-7">
          {/* Book Page Running Header */}
          <header className="pb-5 border-b border-white/20">
            <div className="flex items-center gap-2.5 text-sm text-[#00E676] urdu-text mb-2">
              <BookOpenCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>
                فتاویٰ رضویہ — جلد نمبر {masla.volume}
                {volInfo ? ` (${volInfo.subtitle})` : ''}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl text-white urdu-heading">
              {masla.title}
            </h1>
          </header>

          {/* 1. سوال */}
          <section aria-labelledby="section-question" className="pb-6 border-b border-white/15">
            <h2
              id="section-question"
              className="text-xl sm:text-2xl text-[#00E676] urdu-heading mb-3"
            >
              1. سوال
            </h2>
            <p className="text-lg sm:text-xl text-white urdu-text">
              {masla.question}
            </p>
          </section>

          {/* 2. جواب / فتویٰ */}
          <section aria-labelledby="section-answer" className="pb-6 border-b border-white/15">
            <h2
              id="section-answer"
              className="text-xl sm:text-2xl text-[#00E676] urdu-heading mb-3"
            >
              2. جواب / فتویٰ
            </h2>
            <p className="text-base sm:text-lg text-white urdu-text">
              {masla.answer}
            </p>
          </section>

          {/* 3. دلیل */}
          <section aria-labelledby="section-dalil" className="pb-6 border-b border-white/15">
            <h2
              id="section-dalil"
              className="text-xl sm:text-2xl text-[#00E676] urdu-heading mb-3"
            >
              3. دلیل (قرآن و حدیث سے)
            </h2>
            <p className="text-base sm:text-lg text-white urdu-text bg-[#083852]/70 border border-white/15 rounded-xl p-4 sm:p-5">
              {masla.dalil}
            </p>
          </section>

          {/* 4. ضروری وضاحت */}
          <section aria-labelledby="section-explanation">
            <h2
              id="section-explanation"
              className="text-xl sm:text-2xl text-[#00E676] urdu-heading mb-3"
            >
              4. ضروری وضاحت (آسان الفاظ میں)
            </h2>
            <p className="text-base sm:text-lg text-white urdu-text">
              {masla.explanation}
            </p>
          </section>

          {/* Book Page Footer */}
          {currentPage && totalPages && (
            <footer className="pt-4 border-t border-white/15 flex items-center justify-between text-xs sm:text-sm text-white/75 urdu-text tabular-nums">
              <span>فتاویٰ رضویہ — جلد نمبر {masla.volume}</span>
              <span>صفحہ {currentPage} / {totalPages}</span>
            </footer>
          )}
        </div>
      </div>

      {/* Book Page-Turning Navigation: پچھلا مسئلہ & اگلا مسئلہ */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {onNavigateMasla && (prevMasla || nextMasla) ? (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={!prevMasla}
              onClick={() => prevMasla && onNavigateMasla(prevMasla)}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-base urdu-text min-h-[48px] ${
                prevMasla
                  ? 'green-btn cursor-pointer'
                  : 'teal-card opacity-45 cursor-not-allowed text-white/60'
              }`}
            >
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>پچھلا مسئلہ</span>
            </button>

            <button
              type="button"
              disabled={!nextMasla}
              onClick={() => nextMasla && onNavigateMasla(nextMasla)}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-base urdu-text min-h-[48px] ${
                nextMasla
                  ? 'green-btn cursor-pointer'
                  : 'teal-card opacity-45 cursor-not-allowed text-white/60'
              }`}
            >
              <span>اگلا مسئلہ</span>
              <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onBack}
          className="teal-card-interactive px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-base text-white urdu-text cursor-pointer min-h-[48px]"
        >
          <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>واپس جائیں</span>
        </button>
      </div>
    </article>
  );
};
