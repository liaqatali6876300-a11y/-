import React, { useEffect, useState } from 'react';
import { Bookmark, ChevronLeft, Trash2 } from 'lucide-react';
import { getBookMeta } from '../data/bukhariMeta';
import { getHadithByIdSync, loadHadithById } from '../data/hadithLoader';
import { Hadith } from '../types/hadith';

interface BookmarksViewProps {
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onSelectHadith: (hadith: Hadith, contextList: Hadith[]) => void;
  onGoHome: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onToggleBookmark,
  onSelectHadith,
  onGoHome,
}) => {
  const [savedHadiths, setSavedHadiths] = useState<Hadith[]>(() =>
    bookmarks
      .map((id) => getHadithByIdSync(id))
      .filter((h): h is Hadith => !!h)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (bookmarks.length === 0) {
      setSavedHadiths([]);
      setLoading(false);
      return;
    }

    const immediate = bookmarks
      .map((id) => getHadithByIdSync(id))
      .filter((h): h is Hadith => !!h);
    setSavedHadiths(immediate);

    if (immediate.length === bookmarks.length) {
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(bookmarks.map((id) => loadHadithById(id)))
      .then((results) => {
        if (active) {
          setSavedHadiths(results.filter((h): h is Hadith => !!h));
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [bookmarks]);

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading">
            محفوظ احادیث (Bookmarks)
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text mt-1 tabular-nums">
            کل محفوظ شدہ احادیث: {bookmarks.length}
          </p>
        </div>
      </div>

      {loading && savedHadiths.length === 0 ? (
        <div className="islamic-card rounded-2xl p-8 text-center">
          <p className="text-xl text-[var(--text-primary)] urdu-text">
            محفوظ احادیث لوڈ ہو رہی ہیں...
          </p>
        </div>
      ) : savedHadiths.length === 0 ? (
        <div className="islamic-card rounded-2xl p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0B3D2E] border border-[#C9A227] flex items-center justify-center">
            <Bookmark className="w-8 h-8 text-[#C9A227]" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl text-[var(--text-primary)] urdu-heading">
            ابھی کوئی حدیث محفوظ نہیں کی گئی
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text">
            کسی بھی حدیث کو کھول کر اوپر موجود "محفوظ کریں" بٹن پر کلک کریں تو وہ یہاں محفوظ ہو جائے گی۔
          </p>
          <button
            type="button"
            onClick={onGoHome}
            className="emerald-btn px-7 py-3 rounded-xl text-lg sm:text-xl urdu-text cursor-pointer min-h-[48px]"
          >
            7 جلدوں میں تلاش کریں
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedHadiths.map((hadith) => {
            const book = getBookMeta(hadith.bookNumber);
            return (
              <div
                key={hadith.id}
                className="islamic-card-interactive rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-3"
              >
                <button
                  type="button"
                  onClick={() => onSelectHadith(hadith, savedHadiths)}
                  className="flex-1 text-right min-w-0 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text tabular-nums">
                    <span>جلد نمبر {hadith.volume}</span>
                    <span aria-hidden="true">·</span>
                    <span>حدیث نمبر {hadith.hadithNumber}</span>
                    {book && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{book.titleArabic}</span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span className="text-[var(--text-secondary)]">{hadith.narrator}</span>
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
                </button>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(hadith.id)}
                    aria-label="محفوظ فہرست سے ہٹائیں"
                    className="p-3 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)] text-red-700 dark:text-red-400 hover:border-red-500 cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectHadith(hadith, savedHadiths)}
                    aria-label="حدیث کھولیں"
                    className="p-3 rounded-xl text-[#0B3D2E] dark:text-[#C9A227] cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
