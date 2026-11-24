import React from 'react';
import { Minus, Moon, Plus, Sun } from 'lucide-react';
import { FontSizeKey, ThemeMode } from '../hooks/usePreferences';

interface ReaderToolbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  fontSize: FontSizeKey;
  onIncreaseFont: () => void;
  onDecreaseFont: () => void;
}

const FONT_LABELS: Record<FontSizeKey, string> = {
  sm: 'چھوٹا',
  md: 'درمیانہ',
  lg: 'بڑا',
  xl: 'بہت بڑا',
};

export const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
  theme,
  onToggleTheme,
  fontSize,
  onIncreaseFont,
  onDecreaseFont,
}) => {
  return (
    <div className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface-alt)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Font Size Controls */}
        <div className="flex items-center gap-2.5">
          <span className="text-sm sm:text-base text-[var(--text-secondary)] urdu-text whitespace-nowrap">
            فونٹ سائز:
          </span>
          <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-1">
            <button
              type="button"
              onClick={onDecreaseFont}
              disabled={fontSize === 'sm'}
              aria-label="فونٹ چھوٹا کریں"
              className="min-w-[40px] min-h-[40px] px-2 rounded-lg flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="px-2.5 text-sm sm:text-base text-[#0B3D2E] dark:text-[#E8C547] urdu-text whitespace-nowrap min-w-[74px] text-center">
              {FONT_LABELS[fontSize]}
            </span>
            <button
              type="button"
              onClick={onIncreaseFont}
              disabled={fontSize === 'xl'}
              aria-label="فونٹ بڑا کریں"
              className="min-w-[40px] min-h-[40px] px-2 rounded-lg flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Day / Night Mode Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[#C9A227] text-sm sm:text-base text-[var(--text-primary)] hover:border-[#0B3D2E] dark:hover:border-[#E8C547] cursor-pointer min-h-[44px] whitespace-nowrap transition-colors"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-5 h-5 text-[#0B3D2E]" aria-hidden="true" />
              <span className="urdu-text">رات موڈ (Night)</span>
            </>
          ) : (
            <>
              <Sun className="w-5 h-5 text-[#C9A227]" aria-hidden="true" />
              <span className="urdu-text">دن موڈ (Day)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
