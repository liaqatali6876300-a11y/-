import React, { useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ALL_MASAIL } from '../data/allMasail';
import { QUICK_TOPICS } from '../data/volumesMeta';
import { Masla } from '../types/fatwa';
import { searchMasail } from '../utils/search';

interface TopicsViewProps {
  onSelectMasla: (masla: Masla) => void;
}

export const TopicsView: React.FC<TopicsViewProps> = ({ onSelectMasla }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(QUICK_TOPICS[0].query);

  const topicResults = useMemo(() => {
    return searchMasail(ALL_MASAIL, selectedTopic).map((r) => r.masla);
  }, [selectedTopic]);

  return (
    <section className="w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-white urdu-heading">
          اہم شرعی موضوعات
        </h1>
        <p className="text-base text-white/85 urdu-text mt-1">
          موضوع منتخب کریں اور اس کے تمام مستند مسائل دیکھیں
        </p>
      </div>

      {/* Interactive Topic Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-7" role="tablist" aria-label="شرعی موضوعات">
        {QUICK_TOPICS.map((topic) => {
          const isSelected = selectedTopic === topic.query;
          return (
            <button
              key={topic.label}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedTopic(topic.query)}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base urdu-text transition-all cursor-pointer min-h-[44px] ${
                isSelected
                  ? 'green-btn'
                  : 'teal-card-interactive text-white'
              }`}
            >
              {topic.label}
            </button>
          );
        })}
      </div>

      {/* Matching Masail List */}
      <div className="space-y-4">
        {topicResults.map((masla) => (
          <button
            key={masla.id}
            type="button"
            onClick={() => onSelectMasla(masla)}
            className="teal-card-interactive w-full text-right rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-sm text-white/80 urdu-text tabular-nums">
                <span className="text-[#00E676]">جلد نمبر {masla.volume}</span>
                <span aria-hidden="true">·</span>
                <span>{masla.topic}</span>
              </div>
              <h2 className="text-lg sm:text-xl text-white urdu-heading mt-1">
                {masla.title}
              </h2>
              <p className="text-sm sm:text-base text-white/90 urdu-text mt-1.5 line-clamp-2">
                {masla.question}
              </p>
            </div>
            <ChevronLeft className="w-5 h-5 text-white/85 shrink-0" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
};
