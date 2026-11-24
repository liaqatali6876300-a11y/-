import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-40 islamic-card rounded-xl px-4 py-2.5 flex items-center gap-2.5 border border-[#C9A227]"
    >
      <WifiOff className="w-4 h-4 text-[#0B3D2E] dark:text-[#C9A227] shrink-0" aria-hidden="true" />
      <span className="text-xs sm:text-sm text-[var(--text-primary)] urdu-text">
        آف لائن موڈ — تمام 30 جلدیں بغیر انٹرنیٹ کے چل رہی ہیں
      </span>
    </div>
  );
};
