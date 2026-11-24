import React, { useMemo, useState } from 'react';
import { Bookmark, ChevronLeft } from 'lucide-react';
import { ALL_MASAIL } from '../data/allMasail';
import { QUICK_TOPICS } from '../data/volumesMeta';
import { Masla } from '../types/fatwa';
import { searchMasail } from '../utils/search';

interface TopicsViewProps {
  isBookmarked: (id: string) => boolean;
  onSelectMasla: (masla: Masla) => void;
}

export const TopicsView: React.FC<TopicsViewProps> = ({ isBookmarked, onSelectMasla }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(QUICK_TOPICS[0].query);

  const topicResults = useMemo(() => {
    return searchMasail(ALL_MASAIL, selectedTopic).map((r) => r.masla);
  }, [selectedTopic]);

  return (
    <section className="w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl text-[#0B3D2E] dark:text-[#E8C547] urdu-heading">
          اہم شرعی موضوعات
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] urdu-text mt-1">
          کسی بھی موضوع کو منتخب کر کے تمام 30 جلدوں سے متعلقہ فتاویٰ پڑھیں
        </p>
      </div>

      {/* Interactive Topic Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-7" role="tablist" aria-label="شرعی موضوعات">
        {QUICK_TOPICS.map((topic) => {
          const isSelected = selectedTopic === topic.query;
          return (
            <button
              key={topic.label}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedTopic(topic.query)}
              className={`px-5 py-2.5 rounded-xl text-base sm:text-lg urdu-text transition-all cursor-pointer min-h-[48px] ${
                isSelected
                  ? 'emerald-btn'
                  : 'islamic-card-interactive text-[var(--text-primary)]'
              }`}
            >
              {topic.label}
            </button>
          );
        })}
      </div>

      {/* Matching Masail List */}
      <div className="space-y-4">
        {topicResults.map((masla) => {
          const saved = isBookmarked(masla.id);
          return (
            <button
              key={masla.id}
              type="button"
              onClick={() => onSelectMasla(masla)}
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
                <h2 className="text-2xl sm:text-3xl text-[var(--text-primary)] urdu-heading mt-1.5">
                  {masla.title}
                </h2>
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
    </section>
  );
};
