import React from 'react';
import { BookOpen } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export type ActiveTab = 'home' | 'volumes' | 'topics';

interface TopNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onGoHome: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, onSelectTab, onGoHome }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2 text-white hover:text-[#00E676] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
        >
          <BookOpen className="w-5 h-5 text-[#00E676] shrink-0" aria-hidden="true" />
          <span className="text-lg sm:text-xl urdu-heading">فتاویٰ رضویہ</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar" aria-label="مین مینو">
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap shrink-0 py-2 text-sm sm:text-base urdu-text transition-colors border-b-2 cursor-pointer min-h-[44px] flex items-center ${
              activeTab === 'home'
                ? 'text-[#00E676] border-[#00E676]'
                : 'text-white border-transparent hover:text-[#00E676]/85'
            }`}
          >
            تلاش
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('volumes')}
            className={`whitespace-nowrap shrink-0 py-2 text-sm sm:text-base urdu-text transition-colors border-b-2 cursor-pointer min-h-[44px] flex items-center ${
              activeTab === 'volumes'
                ? 'text-[#00E676] border-[#00E676]'
                : 'text-white border-transparent hover:text-[#00E676]/85'
            }`}
          >
            تمام 30 جلدیں
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('topics')}
            className={`whitespace-nowrap shrink-0 py-2 text-sm sm:text-base urdu-text transition-colors border-b-2 cursor-pointer min-h-[44px] flex items-center ${
              activeTab === 'topics'
                ? 'text-[#00E676] border-[#00E676]'
                : 'text-white border-transparent hover:text-[#00E676]/85'
            }`}
          >
            اہم موضوعات
          </button>
        </nav>

        {/* Zone 3: Single primary action (PWA Install when available) */}
        <div className="flex items-center shrink-0">
          <PWAInstallButton compact />
        </div>
      </div>
    </header>
  );
};
