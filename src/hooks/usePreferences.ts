import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
export type FontSizeKey = 'sm' | 'md' | 'lg' | 'xl';

const FONT_SCALE_MAP: Record<FontSizeKey, number> = {
  sm: 0.9,
  md: 1,
  lg: 1.18,
  xl: 1.36,
};

const STORAGE_THEME = 'fatawa_razvia_theme';
const STORAGE_FONT = 'fatawa_razvia_font';
const STORAGE_BOOKMARKS = 'fatawa_razvia_bookmarks';

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

  // Sync .dark class on <html>
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

  // Sync --font-scale CSS variable on <html>
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

  // Persist bookmarks
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

  const toggleBookmark = useCallback((maslaId: string) => {
    setBookmarks((prev) =>
      prev.includes(maslaId)
        ? prev.filter((id) => id !== maslaId)
        : [maslaId, ...prev]
    );
  }, []);

  const isBookmarked = useCallback(
    (maslaId: string) => bookmarks.includes(maslaId),
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
