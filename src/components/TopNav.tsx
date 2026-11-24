import React from 'react';
import { BookOpen } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export type ActiveTab = 'home' | 'topics' | 'bookmarks';

interface TopNavProps {
  activeTab: ActiveTab;
  bookmarkCount: number;
  onSelectTab: (tab: ActiveTab) => void;
  onGoHome: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  bookmarkCount,
  onSelectTab,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0B3D2E] dark:bg-[#06241B] text-[#FFF8E7] border-b-2 border-[#C9A227] shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[74px] flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-[#FFF8E7] hover:text-[#E8C547] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
        >
          <BookOpen className="w-6 h-6 text-[#C9A227] shrink-0" aria-hidden="true" />
          <span className="text-xl sm:text-2xl urdu-heading">فتاویٰ رضویہ</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="flex items-center gap-4 sm:gap-7 overflow-x-auto" aria-label="مین مینو">
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap shrink-0 py-2 text-base sm:text-lg urdu-text transition-colors border-b-2 cursor-pointer min-h-[44px] flex items-center ${
              activeTab === 'home'
                ? 'text-[#E8C547] border-[#C9A227]'
                : 'text-[#FFF8E7]/90 border-transparent hover:text-[#E8C547]'
            }`}
          >
            30 جلدیں
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('topics')}
            className={`whitespace-nowrap shrink-0 py-2 text-base sm:text-lg urdu-text transition-colors border-b-2 cursor-pointer min-h-[44px] flex items-center ${
              activeTab === 'topics'
                ? 'text-[#E8C547] border-[#C9A227]'
                : 'text-[#FFF8E7]/90 border-transparent hover:text-[#E8C547]'
            }`}
          >
            موضوعات
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('bookmarks')}
            className={`whitespace-nowrap shrink-0 py-2 text-base sm:text-lg urdu-text transition-colors border-b-2 cursor-pointer min-h-[44px] flex items-center gap-1.5 tabular-nums ${
              activeTab === 'bookmarks'
                ? 'text-[#E8C547] border-[#C9A227]'
                : 'text-[#FFF8E7]/90 border-transparent hover:text-[#E8C547]'
            }`}
          >
            <span>محفوظ</span>
            {bookmarkCount > 0 && (
              <span className="text-sm sm:text-base text-[#E8C547]">({bookmarkCount})</span>
            )}
          </button>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <PWAInstallButton compact />
        </div>
      </div>
    </header>
  );
};
