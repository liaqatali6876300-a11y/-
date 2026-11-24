import React, { useMemo, useState } from 'react';
import { BookMarked, ChevronLeft, Search, X } from 'lucide-react';
import { BOOKS_META, TOTAL_BOOKS } from '../data/bukhariMeta';
import { normalizeArabicUrdu } from '../utils/search';

interface BooksDirectoryViewProps {
  onSelectBook: (volumeNumber: number, bookNumber: number) => void;
}

export const BooksDirectoryView: React.FC<BooksDirectoryViewProps> = ({ onSelectBook }) => {
  const [query, setQuery] = useState('');

  const filteredBooks = useMemo(() => {
    const q = normalizeArabicUrdu(query);
    if (!q) return BOOKS_META;
    return BOOKS_META.filter((b) => {
      const target = normalizeArabicUrdu(
        `${b.bookNumber} ${b.titleArabic} ${b.titleUrdu} ${b.titleEnglish}`
      );
      return target.includes(q);
    });
  }, [query]);

  return (
    <section className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading">
          صحیح بخاری کی مکمل {TOTAL_BOOKS} کتابیں (فہرستِ ابواب)
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text mt-1">
          کتاب بدء الوحی سے کتاب التوحید تک تمام 97 کتابوں میں سے کسی بھی کتاب پر کلک کریں
        </p>
      </div>

      {/* Filter 97 books */}
      <div className="mb-6 relative max-w-2xl">
        <Search
          className="w-6 h-6 text-[#0B3D2E] dark:text-[#C9A227] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="کتاب تلاش کریں... مثال: الوضوء، الصلوٰۃ، النکاح، التفسیر، التوحید"
          aria-label="97 کتابوں میں تلاش کریں"
          className="search-input-islamic w-full rounded-2xl pr-13 pl-12 py-3.5 text-lg sm:text-xl urdu-text"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="تلاش صاف کریں"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1.5 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {filteredBooks.length === 0 ? (
        <div className="islamic-card rounded-2xl p-8 text-center">
          <p className="text-xl text-[var(--text-primary)] urdu-text">
            "{query}" سے متعلق کوئی کتاب نہیں ملی۔
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="emerald-btn mt-4 px-6 py-3 rounded-xl text-lg urdu-text cursor-pointer min-h-[48px]"
          >
            تمام 97 کتابیں دکھائیں
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredBooks.map((book) => (
            <button
              key={book.bookNumber}
              type="button"
              onClick={() => onSelectBook(book.volume, book.bookNumber)}
              className="volume-card w-full text-right rounded-2xl p-3.5 cursor-pointer"
            >
              <div className="volume-card-inner rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-11 h-12 rounded-xl bg-[#072B20] border border-[#C9A227] flex items-center justify-center shrink-0">
                    <BookMarked className="w-5 h-5 text-[#C9A227]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base text-[#F2D15B] urdu-text tabular-nums">
                      کتاب {book.bookNumber} · جلد {book.volume}
                    </p>
                    <h2 className="text-xl sm:text-2xl text-[#FFF8E7] urdu-heading mt-0.5">
                      {book.titleArabic}
                    </h2>
                    <p className="text-base sm:text-lg text-[#F5DC84] urdu-text mt-0.5 line-clamp-1">
                      {book.titleUrdu}
                    </p>
                    <p className="mt-1.5 text-sm sm:text-base text-[#FFFDF5]/95 urdu-text tabular-nums">
                      احادیث: {book.hadithCount} ({book.firstHadith} تا {book.lastHadith})
                    </p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-[#C9A227] shrink-0" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
