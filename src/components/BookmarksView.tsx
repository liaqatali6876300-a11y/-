import React from 'react';
import { Bookmark, ChevronLeft, Trash2 } from 'lucide-react';
import { getMaslaById } from '../data/allMasail';
import { Masla } from '../types/fatwa';

interface BookmarksViewProps {
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onSelectMasla: (masla: Masla) => void;
  onGoHome: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onToggleBookmark,
  onSelectMasla,
  onGoHome,
}) => {
  const savedMasail = bookmarks
    .map((id) => getMaslaById(id))
    .filter((m): m is Masla => !!m);

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading">
            محفوظ فتاویٰ (Bookmarks)
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text mt-1 tabular-nums">
            کل محفوظ شدہ مسائل: {savedMasail.length}
          </p>
        </div>
      </div>

      {savedMasail.length === 0 ? (
        <div className="islamic-card rounded-2xl p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0B3D2E] border border-[#C9A227] flex items-center justify-center">
            <Bookmark className="w-8 h-8 text-[#C9A227]" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl text-[var(--text-primary)] urdu-heading">
            ابھی کوئی فتویٰ محفوظ نہیں کیا گیا
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text">
            کسی بھی مسئلہ کو کھول کر اوپر موجود "محفوظ کریں" بٹن پر کلک کریں تو وہ یہاں محفوظ ہو جائے گا۔
          </p>
          <button
            type="button"
            onClick={onGoHome}
            className="emerald-btn px-7 py-3 rounded-xl text-lg sm:text-xl urdu-text cursor-pointer min-h-[48px]"
          >
            30 جلدوں میں تلاش کریں
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedMasail.map((masla) => (
            <div
              key={masla.id}
              className="islamic-card-interactive rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-3"
            >
              <button
                type="button"
                onClick={() => onSelectMasla(masla)}
                className="flex-1 text-right min-w-0 cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text tabular-nums">
                  <span>جلد نمبر {masla.volume}</span>
                  {masla.sawalNumber && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>سوال نمبر {masla.sawalNumber}</span>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span>{masla.bab ?? masla.topic}</span>
                  {masla.risalaName && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--text-secondary)]">{masla.risalaName}</span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl text-[var(--text-primary)] urdu-heading mt-1.5">
                  {masla.title}
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text mt-1.5 line-clamp-2">
                  {masla.question}
                </p>
              </button>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onToggleBookmark(masla.id)}
                  aria-label="محفوظ فہرست سے ہٹائیں"
                  className="p-3 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)] text-red-700 dark:text-red-400 hover:border-red-500 cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectMasla(masla)}
                  aria-label="فتویٰ کھولیں"
                  className="p-3 rounded-xl text-[#0B3D2E] dark:text-[#C9A227] cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
