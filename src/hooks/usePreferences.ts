import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
export type FontSizeKey = 'sm' | 'md' | 'lg' | 'xl';

const FONT_SCALE_MAP: Record<FontSizeKey, number> = {
  sm: 0.9,
  md: 1,
  lg: 1.18,
  xl: 1.36,
};

const STORAGE_THEME = 'sahih_bukhari_theme';
const STORAGE_FONT = 'sahih_bukhari_font';
const STORAGE_BOOKMARKS = 'sahih_bukhari_bookmarks';

export function usePreferences() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [fontSize, setFontSize] = useState<FontSizeKey>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FONT) as FontSizeKey | null;
      return saved && saved in FONT_SCALE_MAP ? saved : 'md';
    } catch {
      return 'md';
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BOOKMARKS);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#061E17' : '#0B3D2E');
    }
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-scale',
      String(FONT_SCALE_MAP[fontSize])
    );
    try {
      localStorage.setItem(STORAGE_FONT, fontSize);
    } catch {
      // ignore storage errors
    }
  }, [fontSize]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(bookmarks));
    } catch {
      // ignore storage errors
    }
  }, [bookmarks]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const increaseFont = useCallback(() => {
    const order: FontSizeKey[] = ['sm', 'md', 'lg', 'xl'];
    setFontSize((prev) => {
      const idx = order.indexOf(prev);
      return idx < order.length - 1 ? order[idx + 1] : prev;
    });
  }, []);

  const decreaseFont = useCallback(() => {
    const order: FontSizeKey[] = ['sm', 'md', 'lg', 'xl'];
    setFontSize((prev) => {
      const idx = order.indexOf(prev);
      return idx > 0 ? order[idx - 1] : prev;
    });
  }, []);

  const toggleBookmark = useCallback((hadithId: string) => {
    setBookmarks((prev) =>
      prev.includes(hadithId)
        ? prev.filter((id) => id !== hadithId)
        : [hadithId, ...prev]
    );
  }, []);

  const isBookmarked = useCallback(
    (hadithId: string) => bookmarks.includes(hadithId),
    [bookmarks]
  );

  return {
    theme,
    toggleTheme,
    fontSize,
    setFontSize,
    increaseFont,
    decreaseFont,
    bookmarks,
    toggleBookmark,
    isBookmarked,
  };
}
