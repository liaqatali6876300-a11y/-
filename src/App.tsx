import React, { useMemo, useRef, useState } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';
import { MaslaDetail } from './components/MaslaDetail';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { ActiveTab, TopNav } from './components/TopNav';
import { TopicsView } from './components/TopicsView';
import { VolumeDetail } from './components/VolumeDetail';
import { VolumeList } from './components/VolumeList';
import { ALL_MASAIL, getMasailByVolume } from './data/allMasail';
import { QUICK_TOPICS } from './data/volumesMeta';
import { Masla } from './types/fatwa';
import { searchMasail } from './utils/search';

export function App() {
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
  };

  const handleQuickTopic = (query: string) => {
    setSearchInput(query);
    setSubmittedQuery(query);
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

  // Previous / Next masla and page numbers within current book context
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0A0F1E] to-[#0B1220] text-white">
      <TopNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-7 sm:py-10">
        {selectedMasla ? (
          <MaslaDetail
            masla={selectedMasla}
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
            onBack={handleBackFromVolume}
            onSelectMasla={handleSelectMasla}
          />
        ) : activeTab === 'volumes' ? (
          <VolumeList onSelectVolume={handleSelectVolume} />
        ) : activeTab === 'topics' ? (
          <TopicsView onSelectMasla={handleSelectMasla} />
        ) : (
          /* Home Page: Offline Book Search System + Results + 30 Book Volumes */
          <div className="space-y-10">
            <section
              aria-labelledby="main-search-heading"
              className="w-full max-w-3xl mx-auto text-center pt-2 sm:pt-4"
            >
              <h1
                id="main-search-heading"
                className="text-3xl sm:text-4xl lg:text-5xl text-white urdu-heading"
              >
                فتاویٰ رضویہ - مکمل کتاب - آف لائن
              </h1>

              <form onSubmit={handleSearchSubmit} className="mt-7 space-y-4">
                <div className="relative">
                  <Search
                    className="w-6 h-6 text-white/80 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchBoxRef}
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="اپنا مسئلہ یہاں لکھیں... مثال: وضو، نماز، روزہ، نکاح"
                    aria-label="اپنا مسئلہ یہاں لکھیں"
                    className="search-input-box w-full rounded-2xl pr-13 pl-12 py-4 sm:py-5 text-lg sm:text-xl urdu-text placeholder:text-white/60"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      aria-label="تلاش صاف کریں"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="submit"
                    className="green-btn w-full sm:w-auto sm:min-w-[240px] px-10 py-3.5 rounded-2xl text-xl urdu-text cursor-pointer min-h-[52px]"
                  >
                    تلاش کریں
                  </button>
                  <PWAInstallButton />
                </div>
              </form>

              <p className="mt-4 text-base sm:text-lg text-white/95 urdu-text tabular-nums">
                کل 30 جلدیں، ہزاروں مسائل · مکمل آف لائن کتاب (اردو اور رومن اردو میں تلاش)
              </p>

              {/* Quick Interactive Filter Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {QUICK_TOPICS.map((topic) => {
                  const isActive = activeQuery === topic.query;
                  return (
                    <button
                      key={topic.label}
                      type="button"
                      onClick={() => handleQuickTopic(topic.query)}
                      className={`px-3.5 py-1.5 rounded-xl text-sm urdu-text cursor-pointer min-h-[40px] transition-all ${
                        isActive ? 'green-btn' : 'teal-card-interactive text-white'
                      }`}
                    >
                      {topic.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Search Results Section */}
            {activeQuery && (
              <section aria-labelledby="search-results-heading" className="w-full max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <h2
                    id="search-results-heading"
                    className="text-xl sm:text-2xl text-white urdu-heading tabular-nums"
                  >
                    تلاش کے نتائج: {searchResults.length} مسائل ملے
                  </h2>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-sm sm:text-base text-[#00E676] hover:underline urdu-text cursor-pointer min-h-[40px] px-2"
                  >
                    تلاش ختم کریں
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="teal-card rounded-2xl p-7 text-center space-y-4">
                    <p className="text-lg sm:text-xl text-white urdu-text">
                      "{activeQuery}" سے متعلق کوئی مسئلہ نہیں ملا۔
                    </p>
                    <p className="text-sm sm:text-base text-white/85 urdu-text">
                      آسان الفاظ آزمائیں: وضو، غسل، نماز، روزہ، زکوٰۃ، حج، نکاح، طلاق، وراثت، سود، قربانی — یا رومن اردو میں لکھیں: wazu, namaz, roza, nikah, talaq, sood
                    </p>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="green-btn px-6 py-2.5 rounded-xl text-base urdu-text cursor-pointer min-h-[44px]"
                    >
                      تلاش صاف کریں
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((masla) => (
                      <button
                        key={masla.id}
                        type="button"
                        onClick={() => handleSelectMasla(masla)}
                        className="teal-card-interactive w-full text-right rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-sm text-white/85 urdu-text tabular-nums">
                            <span className="text-[#00E676]">جلد نمبر {masla.volume}</span>
                            <span aria-hidden="true">·</span>
                            <span>{masla.topic}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl text-white urdu-heading mt-1">
                            {masla.title}
                          </h3>
                          <p className="text-sm sm:text-base text-white/90 urdu-text mt-1.5 line-clamp-2">
                            {masla.question}
                          </p>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-white/85 shrink-0" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 30 Book Volumes System */}
            <div className="pt-2 border-t border-white/10">
              <VolumeList onSelectVolume={handleSelectVolume} />
            </div>
          </div>
        )}
      </main>

      <OfflineIndicator />

      <footer className="border-t border-white/10 py-6 px-4 text-center">
        <p className="text-sm text-white/80 urdu-text">
          فتاویٰ رضویہ — مکمل آف لائن کتاب اور سرچ ایپ · کل 30 جلدیں
        </p>
      </footer>
    </div>
  );
}

export default App;
