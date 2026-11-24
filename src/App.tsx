import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, ChevronLeft, Search, X } from 'lucide-react';
import { BookmarksView } from './components/BookmarksView';
import { BooksDirectoryView } from './components/BooksDirectoryView';
import { HadithDetail } from './components/HadithDetail';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { ReaderToolbar } from './components/ReaderToolbar';
import { ActiveTab, TopNav } from './components/TopNav';
import { VolumeDetail } from './components/VolumeDetail';
import { VolumeList } from './components/VolumeList';
import {
  QUICK_TOPICS,
  TOTAL_BOOKS,
  TOTAL_HADITHS_UNIQUE,
  TOTAL_HADITHS_WITH_REPEATS,
  TOTAL_VOLUMES,
  getBookMeta,
} from './data/bukhariMeta';
import {
  getCachedAllHadiths,
  getCachedVolumeHadiths,
  loadAllVolumes,
} from './data/hadithLoader';
import { usePreferences } from './hooks/usePreferences';
import { Hadith } from './types/hadith';
import { searchHadiths } from './utils/search';

const SEARCH_BATCH_SIZE = 40;

export function App() {
  const {
    theme,
    toggleTheme,
    fontSize,
    increaseFont,
    decreaseFont,
    bookmarks,
    toggleBookmark,
    isBookmarked,
  } = usePreferences();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchInput, setSearchInput] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [hadithContextList, setHadithContextList] = useState<Hadith[]>([]);
  const [searchResultLimit, setSearchResultLimit] = useState(SEARCH_BATCH_SIZE);

  const [allHadiths, setAllHadiths] = useState<Hadith[]>(() => getCachedAllHadiths());
  const [loadedVolumesCount, setLoadedVolumesCount] = useState<number>(0);
  const [isCorpusLoading, setIsCorpusLoading] = useState<boolean>(true);

  const searchBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    loadAllVolumes((loadedVols) => {
      if (!active) return;
      setLoadedVolumesCount(loadedVols);
      setAllHadiths(getCachedAllHadiths());
    })
      .then((completeList) => {
        if (!active) return;
        setAllHadiths(completeList);
        setLoadedVolumesCount(TOTAL_VOLUMES);
        setIsCorpusLoading(false);
      })
      .catch(() => {
        if (active) setIsCorpusLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const activeQuery = searchInput.trim() || submittedQuery.trim();

  useEffect(() => {
    setSearchResultLimit(SEARCH_BATCH_SIZE);
  }, [activeQuery]);

  const searchResults = useMemo(() => {
    if (!activeQuery) return [];
    return searchHadiths(allHadiths, activeQuery).map((r) => r.hadith);
  }, [allHadiths, activeQuery]);

  const visibleSearchResults = useMemo(
    () => searchResults.slice(0, searchResultLimit),
    [searchResults, searchResultLimit]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedHadith(null);
    setSelectedVolume(null);
    setSelectedBook(null);
    setActiveTab('home');
    scrollToTop();
    setTimeout(() => {
      searchBoxRef.current?.focus();
    }, 120);
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setSelectedHadith(null);
    setSelectedVolume(null);
    setSelectedBook(null);
    setActiveTab(tab);
    scrollToTop();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchInput.trim());
    setSelectedHadith(null);
    setSelectedVolume(null);
    setSelectedBook(null);
    setActiveTab('home');
    if (isCorpusLoading) {
      loadAllVolumes((loadedVols) => {
        setLoadedVolumesCount(loadedVols);
        setAllHadiths(getCachedAllHadiths());
      }).catch(() => {});
    }
  };

  const handleQuickTopic = (query: string) => {
    setSearchInput(query);
    setSubmittedQuery(query);
    setSelectedHadith(null);
    setSelectedVolume(null);
    setSelectedBook(null);
    setActiveTab('home');
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSubmittedQuery('');
    searchBoxRef.current?.focus();
  };

  const handleSelectVolume = (volumeNumber: number) => {
    setSelectedHadith(null);
    setSelectedBook(null);
    setSelectedVolume(volumeNumber);
    scrollToTop();
  };

  const handleSelectBook = (volumeNumber: number, bookNumber: number) => {
    setSelectedHadith(null);
    setSelectedVolume(volumeNumber);
    setSelectedBook(bookNumber);
    setActiveTab('home');
    scrollToTop();
  };

  const handleSelectHadith = (hadith: Hadith, contextList?: Hadith[]) => {
    if (contextList && contextList.length > 0) {
      setHadithContextList(contextList);
    }
    setSelectedHadith(hadith);
    scrollToTop();
  };

  const handleBackFromHadith = () => {
    setSelectedHadith(null);
    scrollToTop();
  };

  const handleBackFromVolume = () => {
    setSelectedVolume(null);
    setSelectedBook(null);
    scrollToTop();
  };

  const { prevHadith, nextHadith, currentPage, totalPages } = useMemo(() => {
    if (!selectedHadith) {
      return {
        prevHadith: undefined,
        nextHadith: undefined,
        currentPage: undefined,
        totalPages: undefined,
      };
    }

    const fallbackVolList = getCachedVolumeHadiths(selectedHadith.volume) ?? [];
    const list =
      hadithContextList.some((h) => h.id === selectedHadith.id)
        ? hadithContextList
        : fallbackVolList;

    const idx = list.findIndex((h) => h.id === selectedHadith.id);
    if (idx === -1) {
      return {
        prevHadith: undefined,
        nextHadith: undefined,
        currentPage: undefined,
        totalPages: undefined,
      };
    }

    return {
      prevHadith: idx > 0 ? list[idx - 1] : undefined,
      nextHadith: idx < list.length - 1 ? list[idx + 1] : undefined,
      currentPage: idx + 1,
      totalPages: list.length,
    };
  }, [selectedHadith, hadithContextList]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <TopNav
        activeTab={activeTab}
        bookmarkCount={bookmarks.length}
        onSelectTab={handleSelectTab}
        onGoHome={handleGoHome}
      />

      <ReaderToolbar
        theme={theme}
        onToggleTheme={toggleTheme}
        fontSize={fontSize}
        onIncreaseFont={increaseFont}
        onDecreaseFont={decreaseFont}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-9">
        {selectedHadith ? (
          <HadithDetail
            hadith={selectedHadith}
            isBookmarked={isBookmarked(selectedHadith.id)}
            onToggleBookmark={toggleBookmark}
            onBack={handleBackFromHadith}
            onNavigateHadith={(h) => handleSelectHadith(h)}
            prevHadith={prevHadith}
            nextHadith={nextHadith}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ) : selectedVolume !== null ? (
          <VolumeDetail
            volumeNumber={selectedVolume}
            initialBookNumber={selectedBook}
            isBookmarked={isBookmarked}
            onBack={handleBackFromVolume}
            onSelectHadith={handleSelectHadith}
          />
        ) : activeTab === 'bookmarks' ? (
          <BookmarksView
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelectHadith={handleSelectHadith}
            onGoHome={handleGoHome}
          />
        ) : activeTab === 'books' ? (
          <BooksDirectoryView onSelectBook={handleSelectBook} />
        ) : (
          /* Home Page: Large Top Search Bar + Results + 7 Volumes Grid */
          <div className="space-y-10">
            <section
              aria-labelledby="main-search-heading"
              className="islamic-card rounded-3xl p-5 sm:p-8"
            >
              <div className="kitab-inner-frame rounded-2xl p-5 sm:p-8 text-center">
                <p className="text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text tabular-nums">
                  امام محمد بن اسماعیل بخاری رحمۃ اللہ علیہ · کل {TOTAL_BOOKS} کتابیں ·{' '}
                  {TOTAL_HADITHS_WITH_REPEATS.toLocaleString('en-US')} احادیث (مع تکرار) ·{' '}
                  {TOTAL_HADITHS_UNIQUE.toLocaleString('en-US')} (بغیر تکرار)
                </p>
                <h1
                  id="main-search-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mt-2"
                >
                  صحیح بخاری شریف - مکمل 7 جلدیں
                </h1>
                <p className="mt-3 text-base sm:text-xl text-[var(--text-secondary)] urdu-text">
                  مکمل عربی متن اعراب کے ساتھ اوپر اور مستند اردو ترجمہ نیچے · 100% آف لائن کتاب
                </p>

                <form onSubmit={handleSearchSubmit} className="mt-6 max-w-3xl mx-auto space-y-4">
                  <div className="relative">
                    <Search
                      className="w-7 h-7 text-[#0B3D2E] dark:text-[#C9A227] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      ref={searchBoxRef}
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="تمام 7,563 احادیث میں تلاش کریں... مثال: وحی، ایمان، وضو، نماز، حدیث نمبر 1"
                      aria-label="تمام 7,563 احادیث میں تلاش کریں"
                      className="search-input-islamic w-full rounded-2xl pr-14 pl-12 py-4 sm:py-5 text-lg sm:text-2xl urdu-text"
                    />
                    {searchInput && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        aria-label="تلاش صاف کریں"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="submit"
                      className="emerald-btn w-full sm:w-auto sm:min-w-[240px] px-10 py-3.5 rounded-2xl text-xl sm:text-2xl urdu-text cursor-pointer min-h-[56px]"
                    >
                      تلاش کریں
                    </button>
                    <PWAInstallButton />
                  </div>
                </form>

                {/* Quick Interactive Topic Buttons */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                  {QUICK_TOPICS.map((topic) => {
                    const isActive = activeQuery === topic.query;
                    return (
                      <button
                        key={topic.label}
                        type="button"
                        onClick={() => handleQuickTopic(topic.query)}
                        className={`px-4 py-2 rounded-xl text-base sm:text-lg urdu-text cursor-pointer min-h-[44px] transition-all ${
                          isActive
                            ? 'emerald-btn'
                            : 'bg-[var(--bg-surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#C9A227]'
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Instant Search Results across all 7 volumes / 7,563 hadiths */}
            {activeQuery && (
              <section aria-labelledby="search-results-heading" className="w-full max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <h2
                      id="search-results-heading"
                      className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading tabular-nums"
                    >
                      تلاش کے نتائج: {searchResults.length.toLocaleString('en-US')} احادیث ملیں
                    </h2>
                    {isCorpusLoading && (
                      <p className="text-sm sm:text-base text-[var(--text-secondary)] urdu-text mt-1 tabular-nums">
                        احادیث کا ڈیٹا لوڈ ہو رہا ہے ({loadedVolumesCount} / {TOTAL_VOLUMES} جلدیں)...
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] hover:underline urdu-text cursor-pointer min-h-[44px] px-2"
                  >
                    تلاش ختم کریں
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="islamic-card rounded-2xl p-7 text-center space-y-4">
                    <p className="text-xl sm:text-2xl text-[var(--text-primary)] urdu-text">
                      {isCorpusLoading
                        ? `"${activeQuery}" تلاش کیا جا رہا ہے، بقیہ جلدیں لوڈ ہو رہی ہیں...`
                        : `"${activeQuery}" سے متعلق کوئی حدیث نہیں ملی۔`}
                    </p>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] urdu-text">
                      آسان الفاظ آزمائیں: وحی، ایمان، وضو، غسل، نماز، روزہ، زکوٰۃ، حج، نکاح، طلاق، قربانی، توحید — یا حدیث نمبر لکھیں (مثال: 1, 256, 7563) یا رومن اردو: wazu, namaz, roza, nikah
                    </p>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="emerald-btn px-7 py-3 rounded-xl text-lg urdu-text cursor-pointer min-h-[48px]"
                    >
                      تلاش صاف کریں
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {visibleSearchResults.map((hadith) => {
                      const saved = isBookmarked(hadith.id);
                      const book = getBookMeta(hadith.bookNumber);
                      return (
                        <button
                          key={hadith.id}
                          type="button"
                          onClick={() => handleSelectHadith(hadith, searchResults)}
                          className="islamic-card-interactive w-full text-right rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="min-w-0 flex-1">
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
                              lang="ar"
                              dir="rtl"
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

                    {searchResults.length > searchResultLimit && (
                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => setSearchResultLimit((prev) => prev + SEARCH_BATCH_SIZE)}
                          className="emerald-btn px-8 py-3.5 rounded-xl text-lg sm:text-xl urdu-text cursor-pointer min-h-[52px] tabular-nums"
                        >
                          مزید نتائج دکھائیں ({searchResults.length - searchResultLimit} باقی)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* 7 Volumes Cards Grid */}
            <VolumeList onSelectVolume={handleSelectVolume} />
          </div>
        )}
      </main>

      <OfflineIndicator />

      <footer className="border-t-2 border-[#C9A227]/60 bg-[#0B3D2E] text-[#FFF8E7] py-6 px-4 text-center">
        <p className="text-base sm:text-lg urdu-text">
          صحیح بخاری شریف — مکمل 7 جلدیں · 97 کتابیں · 7,563 احادیث · آف لائن سرچ ایپ
        </p>
      </footer>
    </div>
  );
}

export default App;
