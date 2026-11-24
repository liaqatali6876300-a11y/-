import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`gold-btn flex items-center justify-center gap-2 rounded-xl whitespace-nowrap shrink-0 cursor-pointer ${
          compact
            ? 'px-3 py-1.5 text-xs sm:text-sm min-h-[38px]'
            : 'px-5 py-2.5 text-sm sm:text-base min-h-[44px]'
        } urdu-text`}
      >
        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>ایپ انسٹال کریں</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`gold-btn flex items-center justify-center gap-2 rounded-xl whitespace-nowrap shrink-0 cursor-pointer ${
            compact
              ? 'px-3 py-1.5 text-xs sm:text-sm min-h-[38px]'
              : 'px-5 py-2.5 text-sm sm:text-base min-h-[44px]'
          } urdu-text`}
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>موبائل میں محفوظ کریں</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="islamic-card w-full max-w-md rounded-2xl p-6 text-right">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <h3 id="ios-install-title" className="text-xl text-[var(--text-primary)] urdu-heading">
                  آئی فون / آئی پیڈ میں انسٹال کریں
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="بند کریں"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1.5 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ol className="mt-4 space-y-3 text-base text-[var(--text-primary)] urdu-text list-decimal list-inside">
                <li className="flex items-center gap-2 flex-wrap">
                  <span>1. سفاری براؤزر میں نیچے</span>
                  <Share className="w-4 h-4 text-[#0B3D2E] dark:text-[#C9A227] inline shrink-0" aria-hidden="true" />
                  <span>(Share) بٹن دبائیں۔</span>
                </li>
                <li>
                  2. نیچے اسکرول کر کے <strong>Add to Home Screen</strong> پر ٹیپ کریں۔
                </li>
                <li>
                  3. اب یہ مکمل کتاب آف لائن آپ کے فون میں محفوظ ہو جائے گی۔
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="emerald-btn mt-6 w-full py-2.5 rounded-xl text-base urdu-text cursor-pointer min-h-[44px]"
              >
                سمجھ آ گیا
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
