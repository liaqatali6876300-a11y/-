import React, { useMemo, useRef, useState } from 'react';
import { Bookmark, ChevronLeft, Search, X } from 'lucide-react';
import { BookmarksView } from './components/BookmarksView';
import { MaslaDetail } from './components/MaslaDetail';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { ReaderToolbar } from './components/ReaderToolbar';
import { ActiveTab, TopNav } from './components/TopNav';
import { TopicsView } from './components/TopicsView';
import { VolumeDetail } from './components/VolumeDetail';
import { VolumeList } from './components/VolumeList';
import {
  ALL_MASAIL,
  TOTAL_PRINTED_FATWAS,
  TOTAL_PRINTED_PAGES,
  TOTAL_RASAIL,
  getMasailByVolume,
} from './data/allMasail';
import { QUICK_TOPICS } from './data/volumesMeta';
import { usePreferences } from './hooks/usePreferences';
import { Masla } from './types/fatwa';
import { searchMasail } from './utils/search';

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
  const [selectedMasla, setSelectedMasla] = useState<Masla | null>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const activeQuery = searchInput.trim() || submittedQuery.trim();

  const searchResults = useMemo(() => {
    if (!activeQuery) return [];
    return searchMasail(ALL_MASAIL, activeQuery).map((r) => r.masla);
  }, [activeQuery]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedMasla(null);
    setSelectedVolume(null);
    setActiveTab('home');
    scrollToTop();
    setTimeout(() => {
      searchBoxRef.current?.focus();
    }, 120);
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setSelectedMasla(null);
    setSelectedVolume(null);
    setActiveTab(tab);
    scrollToTop();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchInput.trim());
    setSelectedMasla(null);
    setSelectedVolume(null);
    setActiveTab('home');
  };

  const handleQuickTopic = (query: string) => {
    setSearchInput(query);
    setSubmittedQuery(query);
    setSelectedMasla(null);
    setSelectedVolume(null);
    setActiveTab('home');
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSubmittedQuery('');
    searchBoxRef.current?.focus();
  };

  const handleSelectVolume = (volumeNumber: number) => {
    setSelectedMasla(null);
    setSelectedVolume(volumeNumber);
    scrollToTop();
  };

  const handleSelectMasla = (masla: Masla) => {
    setSelectedMasla(masla);
    scrollToTop();
  };

  const handleBackFromMasla = () => {
    setSelectedMasla(null);
    scrollToTop();
  };

  const handleBackFromVolume = () => {
    setSelectedVolume(null);
    scrollToTop();
  };

  const { prevMasla, nextMasla, currentPage, totalPages } = useMemo(() => {
    if (!selectedMasla) {
      return {
        prevMasla: undefined,
        nextMasla: undefined,
        currentPage: undefined,
        totalPages: undefined,
      };
    }
    const list =
      selectedVolume !== null
        ? getMasailByVolume(selectedVolume)
        : activeQuery && searchResults.length > 0
          ? searchResults
          : getMasailByVolume(selectedMasla.volume);
    const idx = list.findIndex((m) => m.id === selectedMasla.id);
    if (idx === -1) {
      return {
        prevMasla: undefined,
        nextMasla: undefined,
        currentPage: undefined,
        totalPages: undefined,
      };
    }
    return {
      prevMasla: idx > 0 ? list[idx - 1] : undefined,
      nextMasla: idx < list.length - 1 ? list[idx + 1] : undefined,
      currentPage: idx + 1,
      totalPages: list.length,
    };
  }, [selectedMasla, selectedVolume, activeQuery, searchResults]);

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
        {selectedMasla ? (
          <MaslaDetail
            masla={selectedMasla}
            isBookmarked={isBookmarked(selectedMasla.id)}
            onToggleBookmark={toggleBookmark}
            onBack={handleBackFromMasla}
            onNavigateMasla={handleSelectMasla}
            prevMasla={prevMasla}
            nextMasla={nextMasla}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ) : selectedVolume !== null ? (
          <VolumeDetail
            volumeNumber={selectedVolume}
            isBookmarked={isBookmarked}
            onBack={handleBackFromVolume}
            onSelectMasla={handleSelectMasla}
          />
        ) : activeTab === 'bookmarks' ? (
          <BookmarksView
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelectMasla={handleSelectMasla}
            onGoHome={handleGoHome}
          />
        ) : activeTab === 'topics' ? (
          <TopicsView
            isBookmarked={isBookmarked}
            onSelectMasla={handleSelectMasla}
          />
        ) : (
          /* Home Page: Large Top Search Bar + Results + 30 Volumes Grid */
          <div className="space-y-10">
            <section
              aria-labelledby="main-search-heading"
              className="islamic-card rounded-3xl p-5 sm:p-8"
            >
              <div className="kitab-inner-frame rounded-2xl p-5 sm:p-8 text-center">
                <p className="text-base sm:text-lg text-[#8E6C0B] dark:text-[#E8C547] urdu-text">
                  العطایا النبویہ فی الفتاویٰ الرضویہ · مصنف: امام احمد رضا خان رحمۃ اللہ علیہ
                </p>
                <h1
                  id="main-search-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading mt-2"
                >
                  فتاویٰ رضویہ - مکمل 30 جلدیں
                </h1>
                <p className="mt-3 text-base sm:text-xl text-[var(--text-secondary)] urdu-text tabular-nums">
                  کل 30 جلدیں · {TOTAL_PRINTED_PAGES.toLocaleString('en-US')}+ صفحات · {TOTAL_PRINTED_FATWAS.toLocaleString('en-US')} سوال جواب · {TOTAL_RASAIL} رسائل · دستیاب مکمل تحریری فتاویٰ: {ALL_MASAIL.length}
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
                      placeholder="تمام 30 جلدوں میں تلاش کریں... مثال: نماز، وضو، طلاق، روزہ، وراثت"
                      aria-label="تمام 30 جلدوں میں مسئلہ تلاش کریں"
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

            {/* Instant Search Results across all 30 volumes */}
            {activeQuery && (
              <section aria-labelledby="search-results-heading" className="w-full max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <h2
                    id="search-results-heading"
                    className="text-2xl sm:text-3xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading tabular-nums"
                  >
                    تلاش کے نتائج: {searchResults.length} فتاویٰ ملے
                  </h2>
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
                      "{activeQuery}" سے متعلق کوئی فتویٰ نہیں ملا۔
                    </p>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] urdu-text">
                      آسان الفاظ آزمائیں: وضو، غسل، نماز، روزہ، زکوٰۃ، حج، نکاح، طلاق، وراثت، سود، قربانی — یا رومن اردو میں لکھیں: wazu, namaz, roza, nikah, talaq
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
                    {searchResults.map((masla) => {
                      const saved = isBookmarked(masla.id);
                      return (
                        <button
                          key={masla.id}
                          type="button"
                          onClick={() => handleSelectMasla(masla)}
                          className="islamic-card-interactive w-full text-right rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="min-w-0 flex-1">
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
                            <h3 className="text-2xl sm:text-3xl text-[var(--text-primary)] urdu-heading mt-1.5">
                              {masla.title}
                            </h3>
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
              </section>
            )}

            {/* 30 Volumes Cards Grid */}
            <VolumeList onSelectVolume={handleSelectVolume} />
          </div>
        )}
      </main>

      <OfflineIndicator />

      <footer className="border-t-2 border-[#C9A227]/60 bg-[#0B3D2E] text-[#FFF8E7] py-6 px-4 text-center">
        <p className="text-base sm:text-lg urdu-text">
          فتاویٰ رضویہ — مکمل 30 جلدیں · آف لائن سرچ ایپ
        </p>
      </footer>
    </div>
  );
}

export default App;
